import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// Import EmailProvider tijdelijk uitgeschakeld vanwege Node.js 'fs' module probleem
// import EmailProvider from "next-auth/providers/email";

// Dit is een tijdelijke dummy gebruikerslijst
// In productie zou dit in een database moeten staan
const users = [
  {
    id: "1",
    name: "Admin Gebruiker",
    email: "admin@example.com",
    password: "admin123", // In productie: gehashte wachtwoorden!
    role: "admin",
  },
  {
    id: "2",
    name: "Content Manager",
    email: "content@example.com",
    password: "content123",
    role: "contentManager",
  },
  {
    id: "3",
    name: "Gewone Gebruiker",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
];

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/:locale/auth/login",
    signOut: "/:locale/auth/logout",
    error: "/:locale/auth/error",
    verifyRequest: "/:locale/auth/verify-request",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPanel = nextUrl.pathname.startsWith("/admin");
      const isOnCMS = nextUrl.pathname.startsWith("/cms");
      
      // Alleen ingelogde gebruikers kunnen naar /admin of /cms
      if (isOnAdminPanel || isOnCMS) {
        if (isLoggedIn) {
          // Controleer of de gebruiker admin rechten heeft
          const userRole = auth?.user.role as string | undefined;
          
          if (isOnAdminPanel && userRole !== "admin") {
            // Geen admin-rechten, stuur naar 403 pagina
            return Response.redirect(new URL("/auth/unauthorized", nextUrl.origin));
          }
          
          if (isOnCMS && (userRole !== "admin" && userRole !== "contentManager")) {
            // Geen contentmanager of admin rechten, stuur naar 403 pagina
            return Response.redirect(new URL("/auth/unauthorized", nextUrl.origin));
          }
          
          // Gebruiker heeft juiste rechten
          return true;
        }
        
        // Niet ingelogd, stuur naar login pagina
        return Response.redirect(new URL("/auth/login", nextUrl.origin));
      }
      
      // Sta andere pagina's toe voor iedereen
      return true;
    },
    jwt({ token, user }) {
      // Als de gebruiker inlogt, voeg role toe aan de JWT token
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // Voeg gebruikersrol toe aan de sessie
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    // Email provider tijdelijk uitgeschakeld vanwege Node.js 'fs' module probleem
    /*
    // Email provider voor e-mail verificatie
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST || "localhost",
        port: process.env.EMAIL_SERVER_PORT ? parseInt(process.env.EMAIL_SERVER_PORT) : 1025,
        auth: {
          user: process.env.EMAIL_SERVER_USER || "",
          pass: process.env.EMAIL_SERVER_PASSWORD || "",
        },
      },
      from: process.env.EMAIL_FROM || "noreply@example.com",
    }),
    */
    
    // Google provider voor OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    
    // Credentials provider voor e-mail/wachtwoord
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        // Zoek de gebruiker in de dummy lijst
        // In productie: zoek in een database
        const user = users.find(
          (user) => 
            user.email === credentials.email && 
            user.password === credentials.password
        );
        
        if (user) {
          return user;
        }
        
        return null;
      },
    }),
  ],
}; 