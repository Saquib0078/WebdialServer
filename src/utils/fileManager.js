// import fs from 'fs';
// import path from 'path';

// const rawDataPath = '../../data';

// const currentModulePath = path.resolve(__dirname); // Use __dirname here
// console.log(currentModulePath);

// const dataPath = path.join(currentModulePath, rawDataPath);
// const categoryPath = path.join(dataPath, 'category/');

// // Function to create a folder if it doesn't exist
// const createFolderIfNotExists = (folderPath) => {
//   try {
//     const realPath = fs.realpathSync(folderPath);
//     if (!fs.existsSync(realPath)) {
//       fs.mkdirSync(realPath, { recursive: true });
//     }
//   } catch (error) {
//     console.error(`Error creating folder: ${error.message}`);
//   }
// };

// // Ensure dataPath and categoryPath exist
// createFolderIfNotExists(dataPath);
// createFolderIfNotExists(categoryPath);

// export { categoryPath, dataPath };
