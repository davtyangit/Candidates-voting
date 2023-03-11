import { FetchCandidates } from '../../redux/candidatesReducer';
import { Candidate } from './candidate/Candidate';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import './Candidates.css';

export const Candidates = () => {
  const dispatch = useDispatch();
  const { candidates } = useSelector((state) => state.candidates);

  useEffect(() => {
    dispatch(FetchCandidates());
  }, []);

  return (
    <div className="candidates">
      {candidates &&
        candidates.map((member) => {
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 600 }}
              animate={{ opacity: 1, y: 0 }}>
              <Candidate key={member.id} member={member} />
            </motion.div>
          );
        })}
    </div>
  );
};
