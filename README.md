
# Client Management App (Frontend)

This is the frontend of the Client Management App built with React.js. It includes a dashboard to view clients, a form to create/edit clients, and a details page to view client documents.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions
1. Clone or download this repository.
2. Navigate to the project directory:
   ```bash
   cd client-management-app 

## Backend Integration Notes
1. The app currently uses mock data in Dashboard.js (see initialClients array).

2. Replace the mock data with API calls to fetch clients from the backend.

3. The form submission in ClientForm.js currently logs to the console. Update it to send data to the backend.

4. The "Upload File" buttons in ClientForm.js and ClientDetails.js are placeholders. Implement file uploads with backend support.


## Backend Integration Notes
## API Endpoints:
The frontend currently uses mock data in Dashboard.js (initialClients array). Replace this with an API call to fetch clients. Expected endpoint:

GET /api/clients

## Response format:
json

[
  {
    "id": 1,
    "company": "Acme Corp",
    "name": "John Smith",
    "gst": "123456789",
    "address": "123 Main St, Anytown"
  },
  ...
]

## Create/Edit Client:
The form in ClientForm.js submits client data. Update the handleSubmit function to send a POST/PUT request to the backend.
## Create a new client:

POST /api/clients

Request body:
json

{
  "company": "New Corp",
  "name": "Jane Doe",
  "gst": "987654321",
  "address": "456 Elm St, Othertown",
  "profileLink": "https://example.com"
}

## Edit an existing client:

PUT /api/clients/:id

Request body: Same as above.

## File Uploads:
The "Upload File" buttons in ClientForm.js and ClientDetails.js are placeholders. Implement file uploads using a multipart form data request.
Example endpoint for uploading a file:

POST /api/clients/:id/upload

## Request: Use FormData to send the file.

The ClientDetails.js page should also fetch a list of uploaded files for each folder:

GET /api/clients/:id/documents?folder=GST%20Documents

## Response format:
json

[
  { "id": 1, "name": "gst_doc.pdf", "url": "https://example.com/files/gst_doc.pdf" },
  ...
]

## Search Functionality:
The search functionality in Dashboard.js and ClientDetails.js currently filters data on the frontend. For better performance, you might want to implement server-side search.
For clients:

GET /api/clients?search=Acme

## For documents:

GET /api/clients/:id/documents?folder=GST%20Documents&search=doc

## Authentication (Optional):
If your app requires authentication, the backend should provide endpoints for login/logout and include a token in the API responses. The frontend can then include this token in the Authorization header for API requests.

## Backend Integration Notes
### Admin Side
- (Existing notes from previous response)

### Client Side
- **Fetch Client Profile**:
  - Endpoint: `GET /api/clients/:id`
  - Response: `{ "id": 1, "company": "Acme Corp", "name": "John Smith", "gst": "123456789", "address": "123 Main St, Anytown", "profileLink": "https://example.com/acme-corp" }`
- **Fetch Documents**:
  - Endpoint: `GET /api/clients/:id/documents`
  - Response: `[{ "folder": "GST Documents", "name": "GST_2023.pdf", "url": "https://example.com/files/gst_2023.pdf", "type": "pdf" }, ...]`
- **Search Documents**:
  - For better performance, implement server-side search:
    - Endpoint: `GET /api/clients/:id/documents?search=term`
    - Response: Same as above, but filtered by the search term.
- **Download All Documents in a Folder**:
  - Endpoint: `GET /api/clients/:id/documents/download?folder=GST%20Documents`
  - Response: A ZIP file containing all documents in the specified folder.
- **Preview and Download**:
  - Ensure the `url` field points to the actual file location.
  - Support CORS for cross-origin requests.
  - For downloads, use appropriate headers (e.g., `Content-Disposition: attachment`).
- **Authentication**:
  - Add authentication to restrict access to authorized clients.

