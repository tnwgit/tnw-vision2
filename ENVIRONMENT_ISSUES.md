# Omgeving Issues TNW-Vision Project

## Lokale ontwikkelomgeving (Next.js)

### Development server problemen op poort 3000

- **Webpack caching fouten**:
  ```
  [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: ENOENT: no such file or directory, rename 'C:\Projects\TNW-vision\.next\cache\webpack\client-development\0.pack.gz_'
  ```

- **Ontbrekende modules**:
  ```
  Error: Cannot find module './447.js'
  Error: Cannot find module './548.js' 
  Error: Cannot find module './vendor-chunks/lucide-react.js'
  ```

- **TypeError in webpack modules**:
  ```
  TypeError: __webpack_modules__[moduleId] is not a function
  ```

### Alternatieve ontwikkelserver op poort 3001

- Command: `npx next dev -p 3001`
- Werkt zonder cacheproblemen
- Note: Flag `--clear` wordt niet ondersteund door Next.js

### Productie build server

- Command: `node .next/standalone/server.js`
- Werkt foutloos op poort 3000
- Vereist wel eerst een succesvolle `npm run build`

### Te verwachten waarschuwingen (niet kritisch)

- React props waarschuwing:
  ```
  React does not recognize the `asChild` prop on a DOM element.
  ```

- Dynamische routes waarschuwing:
  ```
  Error: Route "/organization/[type]" used `params.type`. `params` should be awaited before using its properties.
  ```

## Oplossing bij problemen

Als de ontwikkelomgeving vastloopt:

1. **Cache leegmaken**:
   ```
   rm -rf .next/cache
   ```

2. **Herstart server op andere poort**:
   ```
   npx next dev -p 3001
   ```

3. **Of gebruik productie build** (na `npm run build`):
   ```
   node .next/standalone/server.js
   ```

## Notities

- De meeste issues lijken gerelateerd aan caching problemen in de Next.js ontwikkelomgeving
- De productie build is stabieler dan de ontwikkelomgeving
- Poort 3001 lijkt minder problemen te hebben dan de standaard poort 3000 