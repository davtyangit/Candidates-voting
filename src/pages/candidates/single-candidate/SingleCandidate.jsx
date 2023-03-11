import { motion } from 'framer-motion'
import ProfileImage from '../../../assets/profile.png'
import { useHandler } from './useHandler'

export const SingleCandidate = () => {

    const { commentsVariant,
        candidates,
        navigate,
        setCommenter,
        setText,
        handleSubmit,
        filtered,
        commenter, text } = useHandler()

    return (
        <div>
            {
                candidates.map((candidates) => {
                    return (
                        <motion.div initial={{ x: -1000 }} animate={{ x: 0 }} key={candidates.id} >
                            <motion.div className='image_info'>
                                <div className='single-page-info'>
                                    <motion.div initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ delay: 0.1 }} style={{ display: "flex", flexDirection: "column" }}>
                                        <img className='single_page_avatar' src={candidates.imageUrl} />
                                        <motion.button
                                            initial={{ y: 10 }} animate={{ y: 0 }} transition={{ delay: 0.4 }}
                                            className='back_btn'
                                            onClick={() => navigate('/')}>
                                            Back to candidates
                                        </motion.button>
                                    </motion.div>

                                    <div className='name-image'>
                                        <div className='information'>
                                            <span>{candidates.name}</span>
                                            <span>{candidates.middlename}</span>
                                            <span>{candidates.surname}</span>
                                        </div>
                                        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className='biography'>{candidates.biography}</motion.div>
                                    </div>
                                </div>


                            </motion.div>
                            <div className='comments'>
                                {
                                    filtered.map((comment, index) => {
                                        return (
                                            <motion.div key={comment.id} >
                                                <motion.div custom={index} className='comment_info' variants={commentsVariant} initial="hidden" animate="visible">
                                                    <img className='comment_img' src={ProfileImage} alt="" />
                                                    <div className='author_and_comment'>
                                                        <span className='comment_author'>{comment.commenter}</span>
                                                        <span>{comment.text}</span>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        )
                                    })
                                }

                                <form className='comment_info' onSubmit={handleSubmit}>
                                    <input className='commenter_name' value={commenter} type="text" placeholder='Name' onChange={(e) => setCommenter(e.target.value)} />
                                    <input value={text} type="text" placeholder='Comment...' onChange={(e) => setText(e.target.value)} />
                                    <button type='submit'>Comment</button>
                                </form>
                            </div>
                        </motion.div >

                    )
                })
            }
        </div >

    )
}
