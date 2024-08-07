
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

const Comment = ()=>{
    return(
        <div>
        <section className="mt-8">
          
          <div className="bg-gray-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-gray-600">@CommentAuthor</h4>
              <div className="flex space-x-4 text-gray-500 text-sm">
                <span>Date</span>
                <span>Time</span>
                <div className="flex space-x-2">
                  <button aria-label="Edit comment"><BiEdit/></button>
                  <button aria-label="Delete comment"><MdDelete/></button>
                </div>
              </div>
            </div>
            <p className="mt-2">Nice post</p>
          </div>
        </section>
        </div>
    )
}
export default Comment;
