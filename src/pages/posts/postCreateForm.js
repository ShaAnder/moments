/// IMPORTS ///

// Data / API / Hooks / Context
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";

// Media / CSS
import css from "../../css/PostCreateEditForm.module.css";
import appCss from "../../App.module.css";
import btnCss from "../../css/Button.module.css";

// Components
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Alert,
  Image,
} from "react-bootstrap";
import Asset from "../../components/Asset";

// Media
import Upload from "../../assets/upload.png";

function PostCreateForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);

  // Added new state property "imageFile" to store the actual file object
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "", // preview URL for display
    imageFile: null, // actual file for upload
  });

  const { title, content, image, imageFile } = postData;

  // Cleanup object URLs when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      const selectedFile = e.target.files[0];
      setPostData({
        ...postData,
        image: URL.createObjectURL(selectedFile), // for client-side preview
        imageFile: selectedFile, // for uploading to Cloudinary via backend
      });
      // Note: We don't reset e.target.value so we can preserve the file reference
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    // Append the file object stored in state (if it exists)
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      navigate(`/posts/${data.id}`);
      console.log(postData);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data || {});
      }
    }
  };

  const textFields = (
    <div className="text-center">
      {/* Title Field */}
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          aria-label="Post title"
        />
        {errors?.title?.map((message, idx) => (
          <Alert variant="warning" key={idx} className="mt-2">
            {message}
          </Alert>
        ))}
      </Form.Group>

      {/* Content Field */}
      <Form.Group className="mb-4">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
          aria-label="Post content"
        />
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx} className="mt-2">
            {message}
          </Alert>
        ))}
      </Form.Group>

      {/* Buttons */}
      <div className="d-flex gap-2 justify-content-center">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className={`${btnCss.Button} ${btnCss.Blue}`}
        >
          Cancel
        </Button>
        <Button type="submit" className={`${btnCss.Button} ${btnCss.Blue}`}>
          Create Post
        </Button>
      </div>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-0">
        <Col md={7} lg={8} className="p-2 p-md-3">
          <Container className={`${appCss.Content} ${css.Container}`}>
            {/* Image Upload Section */}
            <Form.Group className="text-center mb-4">
              {image ? (
                <div className="position-relative">
                  <Image
                    src={image}
                    rounded
                    className={`${appCss.Image} mb-3`}
                    alt="Post preview"
                  />
                  <Form.Label
                    htmlFor="image-upload"
                    className={`${btnCss.Button} ${btnCss.Blue} btn-sm`}
                  >
                    Change Image
                  </Form.Label>
                </div>
              ) : (
                <Form.Label
                  htmlFor="image-upload"
                  className="cursor-pointer d-block"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                    className="p-4"
                  />
                </Form.Label>
              )}

              <Form.Control
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
                className="visually-hidden"
                aria-label="Image upload"
              />
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx} className="mt-2">
                  {message}
                </Alert>
              ))}
            </Form.Group>

            {/* Mobile Fields */}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>

        {/* Desktop Fields */}
        <Col md={5} lg={4} className="p-2 p-md-3">
          <Container className={appCss.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
