import { useState } from 'react';

const Home = () => {
  const [profileImage, setProfileImage] = useState('');

  const [imagePreview, setImagePreview] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const cloudName = import.meta.env.VITE_Cloudinary_CloudName;
  const presetName = import.meta.env.VITE_Cloudinary_PresetName;

  console.log('cloudName', cloudName);
  console.log('presetName', presetName);

  const handleImage = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === 'image/png' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/jpeg')
      ) {
        const image = new FormData();
        image.append('file', profileImage);
        image.append('cloud_name', cloudName);
        image.append('upload_preset', presetName);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: image,
          },
        );

        console.log('response', response);
        const imgData = await response.json();
        imageURL = imgData.url.toString();
        setImagePreview(null);
      }
      alert(imageURL);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <section>
        <div className="home">
          <h2>Upload Image to Cloudinary...</h2>
          <div className="card">
            <form onSubmit={uploadImage} className="--form-control">
              <p>
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  name="image"
                  onChange={handleImage}
                />
              </p>

              <div className="profile-photo">
                <div>
                  {imagePreview && (
                    <img src={imagePreview && imagePreview} alt="profileImg" />
                  )}
                </div>
              </div>

              <div>
                {isLoading ? (
                  'Uploading'
                ) : (
                  <button type="submit" className="--btn --btn-primary">
                    Upload Image
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
