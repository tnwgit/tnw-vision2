import NextAuth from "next-auth";
import { authConfig } from "./auth-options";

// Declareer de gebruikersrol in de types
declare module "next-auth" {
  interface User {
    role?: string;
    id?: string;
  }
  
  interface Session {
    user: {
      role?: string;
      id?: string;
    } & DefaultSession["user"];
  }
}

// Declareer de rol in de JWT token
declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
  }
}

// Exporteer de NextAuth instance met de configuratie
export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth(authConfig);

// Re-export de SessionProvider
export { SessionProvider } from "next-auth/react"; 