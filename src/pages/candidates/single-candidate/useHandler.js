import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FetchSingleCandidate } from '../../../redux/candidatesReducer';
import { FetchComments, WriteComment } from '../../../redux/commentsReducer';

export const useHandler = () => {
  const commentsVariant = {
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
      },
    }),
    hidden: {
      x: 100,
      opacity: 0,
    },
  };

  const { candidates } = useSelector((state) => state.candidates);
  const { comments } = useSelector((state) => state.comments);

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [commenter, setCommenter] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(FetchComments());
  }, []);

  useEffect(() => {
    dispatch(FetchComments());
  }, [commenter, text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setText('');
    setCommenter('');

    const personID = +id;

    const data = { text, commenter, personID };
    if (data.text.trim() !== '' && data.commenter.trim() !== '') {
      dispatch(WriteComment(data, personID));
    } else {
      toast.error('All fields are required');
    }
  };

  useEffect(() => {
    dispatch(FetchSingleCandidate(id));
    dispatch(FetchComments());
  }, []);

  let filtered = comments.filter((c) => c.personID === +id);
  return {
    commentsVariant,
    candidates,
    navigate,
    handleSubmit,
    filtered,
    setCommenter,
    setText,
    commenter,
    text,
  };
};
