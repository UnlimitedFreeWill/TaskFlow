# TaskFlow Frontend

## Descriere

Frontend-ul aplicației TaskFlow este construit folosind **React** și TypeScript, având ca scop oferirea unei interfețe intuitive pentru gestionarea taskurilor. Aplicația comunică cu backend-ul prin intermediul unui API REST.

## Structura proiectului

```
taskflow-frontend/
├── src/
│   ├── components/          # Componente reutilizabile (ex: TaskList)
│   ├── pages/               # Paginile principale ale aplicației (ex: Dashboard)
│   ├── config/              # Configurații generale (ex: api.ts)
│   ├── types/               # Tipuri definite cu TypeScript (ex: task.d.ts)
│   ├── App.tsx              # Componenta principală
│   ├── main.tsx             # Punctul de intrare în aplicație
├── public/                  # Fișiere publice (ex: index.html)
├── Dockerfile               # Configurația Docker pentru frontend
├── package.json             # Gestionarea dependințelor npm
├── vite.config.ts           # Configurația pentru Vite (bundler-ul folosit)
```

## Funcționalități implementate

1. **Dashboard pentru gestionarea taskurilor:**
   - Listarea taskurilor existente.
   - Adăugarea de noi taskuri.
   - Editarea și ștergerea taskurilor existente.
2. **Comunicare cu backend-ul:**
   - Integrare cu API-ul REST pentru a accesa și modifica datele.
3. **Design responsiv:**
   - Interfață adaptabilă pentru diferite dimensiuni de ecran.

## Configurare

1. **Fișier `api.ts`**
   ```typescript
   const API_BASE_URL = "http://localhost:8080/tasks";

   export const fetchTasks = async () => {
       const response = await fetch(`${API_BASE_URL}`);
       return response.json();
   };

   export const createTask = async (task) => {
       const response = await fetch(`${API_BASE_URL}`, {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(task),
       });
       return response.json();
   };

   // Alte metode pentru update și delete...
   ```

2. **Dockerfile pentru frontend**
   ```dockerfile
   # Faza de build
   FROM node:22 AS build
   WORKDIR /app
   COPY . .
   RUN npm install && npm run build

   # Faza de servire
   FROM nginx:latest
   COPY --from=build /app/dist /usr/share/nginx/html
   EXPOSE 80
   ```

## Comenzi utile

1. **Rulare locală:**
   ```bash
   npm install
   npm run dev
   ```
2. **Construire pentru producție:**
   ```bash
   npm run build
   ```
3. **Pornire container Docker:**
   ```bash
   docker build -t taskflow-frontend .
   docker run -p 3000:80 taskflow-frontend
   ```

## Structura paginilor și componentelor

- **Dashboard.tsx**
  - Pagină principală care afișează lista taskurilor utilizând componenta `TaskList`.
- **TaskList.tsx**
  - Componentă responsabilă de afișarea taskurilor într-o listă.
- **App.tsx**
  - Componenta de bază care gestionează routing-ul între pagini.

## Testare

- Testarea aplicației se poate realiza în browser prin rularea locală sau utilizând instrumente precum **Postman** pentru a verifica interacțiunea cu backend-ul.
