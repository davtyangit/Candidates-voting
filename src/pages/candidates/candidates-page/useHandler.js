import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AddCandidate, FetchCandidates } from '../../../redux/candidatesReducer';

export const useHandler = () => {
  const { candidates } = useSelector((state) => state.candidates);
  const dispatch = useDispatch();

  const [addForm, setAddForm] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [middlename, setMiddleName] = useState('');
  const [biography, setBiography] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const [myimage, setMyImage] = useState(null);

  const onUploadImage = async (file) => {
    const URL = 'http://api.cloudinary.com/v1_1/dth7rq73s/image/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ihkjlzgy');
    try {
      const res = await axios.post(URL, formData);
      setImageUrl(res.data.url);
      toast.info('Image succesfully uploaded!');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const uploadImage = (e) => setMyImage(URL.createObjectURL(e.target.files[0]));
  const handleName = (e) => setName(e.target.value);
  const handleSurname = (e) => setSurname(e.target.value);
  const handleMiddlename = (e) => setMiddleName(e.target.value);
  const handleBiography = (e) => setBiography(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, surname, middlename, biography, imageUrl };
    if (data.name.trim() !== '' && data.surname.trim() !== '' && data.name.trim() !== '') {
      dispatch(AddCandidate(data));
      toast.success('The candidate has been added to the list');
      closeAddForm();
      dispatch(FetchCandidates());
    } else {
      toast.error('All fields are required');
    }
  };

  const openAddForm = () => setAddForm(true);
  const closeAddForm = () => {
    setAddForm(false);
    setMyImage('');
  };

  useEffect(() => {
    dispatch(FetchCandidates());
  }, []);

  return {
    candidates,
    uploadImage,
    handleName,
    handleSurname,
    handleMiddlename,
    handleBiography,
    handleSubmit,
    onUploadImage,
    openAddForm,
    addForm,
    myimage,
    closeAddForm,
  };
};
