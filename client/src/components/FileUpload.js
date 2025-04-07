import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import toast from 'react-hot-toast';

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [loading, setLoading] = useState(false);

  const uploadSuccessToast = () => toast('Successfully Image Uploaded ✅');
  const uploadFailedToast = () => toast('Unable to upload image to Pinata 🚫');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "70deac7ca5962120ed58",
            pinata_secret_api_key: "5d24408e22350a94d51b781e1a7c79eeaa17becf09191b15fea3543c05799954",
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account,ImgHash);
        setFileName("No image selected");
        setFile(null);
      } 
      catch (e) {
        
        uploadFailedToast();
      } 
      finally {
        setLoading(false);
      }
    }
    uploadSuccessToast();
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file || loading}>
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </form>
    </div>
  );
};
export default FileUpload;


