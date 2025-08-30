import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Image, Upload } from "antd";
import { useField } from "formik";
import { FC, useState } from "react";
import { Label } from "reactstrap";
import { FileType, ImageUploadProps } from "../../Types";
import { Mutations } from "../../Api";

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload: FC<ImageUploadProps> = ({ multiple, name, accept, isListType, label, required }) => {
  
  const [field, meta, helpers] = useField<string[]>({ name: name || "" });
  console.log(field.value);

  const [fileList, setFileList] = useState<string[]>(Array.isArray(field.value) ? field.value : []);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const { mutate: uploadImage, isPending: isUserUpdating } = Mutations.useUpload();

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const customUpload: UploadProps["beforeUpload"] = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      uploadImage(formData, {
        onSuccess: (response) => {
          const uploadedUrl = response.data as string;
          const updatedList = multiple ? [...fileList, uploadedUrl] : [uploadedUrl];
          setFileList(updatedList);
          helpers.setValue(updatedList);
        },
      });
    } catch (error) {}

    return false;
  };

  const removeFile = async (imageSrc: string) => {
    try {
      const updatedList = fileList.filter((img) => img !== imageSrc);
      setFileList(updatedList);

      helpers.setValue(updatedList);
    } catch (err) {}
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      {isListType !== "picture-circle" && (
        <Label>
          {label ? label : "Upload Logo"} {required && <span className="required">*</span>}
        </Label>
      )}
      <Upload
        accept={accept ?? "image/*"}
        listType={isListType ?? "picture-card"}
        fileList={fileList.map((url, index) => ({
          uid: String(index),
          name: `file-${index}.jpg`,
          status: isUserUpdating ? "uploading" : "done",
          url,
        }))}
        beforeUpload={customUpload}
        onPreview={handlePreview}
        onRemove={(file) => {
          if (file.url) removeFile(file.url);
        }}
        multiple={multiple}
        className={meta.touched && meta.error ? "is-invalid" : ""}
      >
        {multiple || fileList.length < 1 ? uploadButton : null}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      {/* ✅ Formik validation error */}
      {meta.touched && meta.error ? <div className="text-danger mt-1 invalid-feedback">{meta.error}</div> : null}
    </>
  );
};

export default ImageUpload;
