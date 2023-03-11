import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Voted from '../../../assets/vote.gif';
import { useDispatch } from 'react-redux';
import { WriteComment } from '../../../redux/commentsReducer';
import './Candidate.css';

export const Candidate = ({ member }) => {
  const navigate = useNavigate();
  const { id, name, middlename, surname, imageUrl } = member;
  const dispatch = useDispatch();

  const [showInfo, setShowInfo] = useState(false);
  const [commentsModal, setCommentsModal] = useState(false);
  const [commenter, setCommenter] = useState('');
  const [text, setText] = useState('');

  const handleComment = (e) => {
    setText(e.target.value);
  };

  const handleCommenterName = (e) => setCommenter(e.target.value);

  const [alreadyVoted, setAlreadyVoted] = useState(false);

  const [voted, setVoted] = useState(false);
  const [commented, setCommented] = useState(false);

  const openInfoModal = () => setShowInfo(true);

  const closeInfoModal = () => {
    setShowInfo(false);
    setVoted(true);

    setTimeout(() => {
      setVoted(false);
      setAlreadyVoted(true);
    }, 2000);
  };

  const closeCommentModal = () => {
    setCommentsModal(false);
    setCommented(true);

    setTimeout(() => {
      setCommented(false);
    }, 2000);

    const personID = id;
    const data = { text, personID, commenter };
    setTimeout(() => {
      dispatch(WriteComment(data, id));
      setText('');
      setCommenter('');
    }, 1000);
  };

  return (
    <motion.div className="back">
      <div key={id} className={alreadyVoted ? 'disabled_candidate' : 'candidate'}>
        <div className="candidate_name-surname-middlenam">
          <span className="surname">{surname}</span>
          <span>{name}</span>
          <span>{middlename}</span>
        </div>

        <img
          className={alreadyVoted ? 'candidate_img_voted' : 'candidate_img'}
          width="100px"
          src={imageUrl}
        />
        {alreadyVoted ? (
          <button className="disables">You already voted</button>
        ) : (
          <div>
            <button
              onClick={() => {
                openInfoModal();
              }}
              className="ables">
              Vote
            </button>
          </div>
        )}
      </div>

      {showInfo && (
        <div className="modal-show">
          <motion.div
            transition={{ delay: 0.1 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal">
            <span>Do you know the candidate?</span>
            <div className="modal-buttons">
              <button onClick={() => closeInfoModal()}>Yes</button>
              <button
                onClick={() => {
                  navigate(`/candidates/${id}`);
                }}>
                See more
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {commentsModal && (
        <div>
          <div className="modal-show">
            <motion.div
              transition={{ delay: 0.1 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="modal">
              <input
                value={commenter}
                onChange={handleCommenterName}
                placeholder="Անուն"
                type="text"
                className="input_comment"
              />
              <input
                value={text}
                onChange={handleComment}
                placeholder="Գրել․․․"
                type="text"
                className="input_comment"
              />
              <button
                style={{ margin: '10px', padding: '3px' }}
                onClick={() => {
                  closeCommentModal();
                }}>
                Մեկնաբանել
              </button>
            </motion.div>
          </div>
        </div>
      )}

      {voted && (
        <div className="modal-show">
          <motion.div
            transition={{ delay: 0.1 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="voted-modal">
            <span>
              You voted for {surname} {name}. Thanks
            </span>
            <img width="50px" src={Voted} />
          </motion.div>
        </div>
      )}

      {commented && (
        <div className="modal-show">
          <motion.div
            transition={{ delay: 0.1 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="voted-modal">
            <span>Thanks for your comment</span>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
