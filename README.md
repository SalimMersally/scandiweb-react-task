# A online shop application

This is an online shop application made using React (with class component) for frontend, and graphQL for backend.
Apollo client was used to link the frontend to backend.
react-router-dom was used for routing

The graphQL endpoint is available at: https://github.com/scandiweb/junior-react-endpoint

## Run the app

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

## Directories

All react code is available in the src folder as follow:

### Components

All components used in the application (all have .jsx extension and are class components)

### Icons

All icons used in the application in SVG format. For simplicity in the main code, they are separeted in components alone to be used anywhere.

### Styles

Styles used in the components, they are seprated in different file for simplicity and better understanding of the design.
Almost each component have it is corresponding css style file

### App.js

All main components are exported here, App.js also include the globale state with function to change it.
The Golbale state with the functions are provided as props.
React router dom is used here.

### Client.js and Queries.js

The Apollo client is difined in Client.js to be used anywhere in the code when we need to fetch data.
All queries are placed in Queries.js to simpify and make the code more cleaner, and also to be able to used them anywhere needed.
