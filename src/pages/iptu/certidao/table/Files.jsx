import PropTypes from "prop-types";
import FileUploadIptu from "./FileUpload";

const Files = ({ data }) => {
  return (
    <>
      <div>
        <FileUploadIptu
          uuid={data.uuid}
          maxSize={2000000}
          type="file"
          className="btn-primary w-full"
        ></FileUploadIptu>
        {data?.certs &&
          data.certs.map((c) => {
            return (
              <a key={c.uuid} href={c.archive} alt={c.name} download={c.name}>
                <div className="bg-gray-200 p-4 text-sm text-nowrap overflow-hidden mt-2 rounded-md hover:bg-gray-300 cursor-pointer">
                  {c.name}
                </div>
              </a>
            );
          })}
      </div>
    </>
  );
};

Files.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    certs: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        archive: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default Files;
