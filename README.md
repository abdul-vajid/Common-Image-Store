# **Backend Coding Assignment Submission**

This repository showcases an advanced cloud image storage solution. The project encompasses two distinct subscription tiers: FREE and PRO. In the FREE tier, users can upload one image at a time, with a one-hour interval between uploads, while the PRO tier, available at a $5 monthly cost, affords users the convenience of uploading multiple images simultaneously without time-based constraints. The integration of Stripe for payments ensures secure and efficient transaction processing.

The completed project can be accessed live at: _https://commonstore.abdulvajid.com_

**The following tools were utilized for the project:**

- Programming language - TypeScript 
- Backend: Node, Express
- Frontend: React, Redux
- Database: MongoDB, Mongoose
- Payment gateway - Stripe
- Backend architecture: MVC with repository pattern
- CSS framework: Tailwind CSS
- libraries: cloudinary, node-scheduler, bcryptjs, morgan, helmet, joi, yup, formik, axios, vite, react-toastify, jsonwebtoken, moment-timezone, dotenv, multer.


## Deployment Instructions:

#### Prerequisites:

- Node.js and Yarn should be installed on your system.
- MongoDB server should be running.

#### Step 1: Clone the Project

Open a terminal and run the following command to clone this project:
```bash
git clone https://github.com/abdul-vajid/Common-Image-Store.git
 
```
#### Step 2: Navigate to the Project Directory

Navigate to the `backend` directory within the cloned project using the command:
```bash
cd Common-Image-Store/backend
 
```

#### Step 3: Install Global Dependencies

Run the following command to install nodemon globally. This will help with server restarts during development.
```bash
  yarn global add nodemon
 
```
#### Step 4: Install Local Dependencies (Backend)

Run the following command to install the required packages locally for the project.

```bash
  yarn install
 
```
#### Step 5: Rename and Configure .env File

- Rename the `sample.env` file to `.env`
- Open the `.env` file and fill in your configuration details, such as the database URL, Stripe API keys, Cloudinary API keys, etc.

#### Step 6: Start the Server

Run the following command to start the Node.js server. Nodemon will automatically restart the server on code changes.

```bash
  yarn dev
 
```
#### Step 7: Navigate to Frontend Directory

Navigate back to the `root` directory of the cloned project using the command:

```bash
  cd ..
 
```
Navigate to the `frontend` directory within the cloned project using the command:
```bash
  cd frontend
 
```
#### Step 8: Install Local Dependencies (Frontend)

Navigate back to the root directory of the cloned project using the command:

```bash
  yarn install
 
```
#### Step 9: Run Frontend with Local Backend Server:

If you wish to run the frontend with a local backend server instead of the hosted server, you will need to modify the `apiConfig.ts` file. Follow these steps:

- Navigate to the `apiConfig.ts` file located at `Common-Image-Store/frontend/src/app/config/apiConfig.ts`
- Open the `apiConfig.ts` file in a editor.
- Locate the `BASE_URL` variable and replace it with the local backend server URL. For example:

```bash
  // Before
  const BASE_URL = "https://commonimagestore.abdulvajid.com/api/v1";

  // After
  export const baseURL = 'http://localhost:5000/api/v1';
```
#### Step 10: Start the Frontend Server

Run the following command to start the React frontend server.

```bash
  yarn dev
 
```

#### Conclusion

Thank you for following these deployment instructions to set up the Common Image Store project. By following these steps, you've successfully configured the backend and frontend components.

For any questions or clarifications, please feel free to contact me at _dev.abdulvajidm@gmail.com_

#### Thank you for reviewing my submission.
