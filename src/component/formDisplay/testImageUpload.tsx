import { useState } from "react";
import { s3 } from "../../store/Api/upload-url";

export default function UploadComponent() {
  const [file, setFile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<any>(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    const params: any = {
      Bucket: process.env.NEXT_PUBLIC_DO_SPACES_BUCKET,
      Key: `uploads/${file.name}`,
      Body: file,
      ACL: "public-read",
      ContentType: file.type,
    };

    try {
      const upload = await s3.upload(params).promise();
      setUploadedUrl(upload.Location); // URL of uploaded file
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {uploadedUrl && (
        <p>
          Uploaded:{" "}
          <a href={uploadedUrl} target="_blank">
            {uploadedUrl}
          </a>
        </p>
      )}
    </div>
  );
}
