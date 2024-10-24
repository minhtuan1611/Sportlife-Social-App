import './index.css'

const MessageSkeleton = () => {
  return (
    <>
      <div className="flex gap-3">
        <div className="skeleton skeleton-circle"></div>
        <div className="flex flex-col">
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-line"></div>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <div className="flex flex-col">
          <div className="skeleton skeleton-line short"></div>
        </div>
        <div className="skeleton skeleton-circle"></div>
      </div>
    </>
  )
}
export default MessageSkeleton
