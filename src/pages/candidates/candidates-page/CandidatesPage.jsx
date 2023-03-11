import { Candidates } from '../../../components/candidates/Candidates';
import { motion } from 'framer-motion';
import { UploadImage } from '../../../assets/UploadImage';
import { useHandler } from './useHandler';

export const CandidatesPage = () => {
  const {
    candidates,
    uploadImage,
    handleName,
    handleSurname,
    handleMiddlename,
    handleBiography,
    handleSubmit,
    onUploadImage,
    openAddForm,
    closeAddForm,
    addForm,
    myimage,
  } = useHandler();

  const buttonVariant = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      x: 100,
      opacity: 0,
    },
  };

  return (
    <div>
      <motion.button
        onClick={openAddForm}
        initial="hidden"
        animate="visible"
        variants={buttonVariant}
        className="add_btn">
        Offer your candidacy
      </motion.button>

      {addForm && (
        <form onSubmit={handleSubmit} className="form_modal">
          <motion.div
            transition={{ delay: 0.1 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="add-form">
            <span className="close" onClick={closeAddForm}>
              X
            </span>
            <input onChange={handleName} placeholder="name..." type="text" />
            <input onChange={handleMiddlename} placeholder="middlename..." type="text" />

            <input onChange={handleSurname} placeholder="surname..." type="text" />
            {!myimage && (
              <div className="upload-files-container">
                <div className="drag-file-area">
                  <UploadImage />
                  <label className="label">
                    <span className="browse-files">
                      <input
                        type="file"
                        onChange={(e) => {
                          onUploadImage(e.target.files[0]);
                          uploadImage(e);
                        }}
                        className="default-file-input"
                      />
                    </span>
                  </label>
                </div>
              </div>
            )}

            {myimage && <img src={myimage} className="uploaded_image" />}

            <textarea onChange={handleBiography} placeholder="biography..." type="text" />

            <button type="submit">Ավելացնել</button>
          </motion.div>
        </form>
      )}
      <Candidates candidates={candidates} />
    </div>
  );
};
