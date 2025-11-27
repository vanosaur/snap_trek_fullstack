export default function UploadOptions() {
  return (
    <div className="flex flex-col items-center text-white p-6 gap-4">
      <h1 className="text-2xl font-bold mb-4">Create</h1>

      <a href="/upload/post" className="w-full bg-blue-600 p-4 rounded text-center">
        Upload Photo Post
      </a>

      <a href="/upload/reel" className="w-full bg-purple-600 p-4 rounded text-center">
        Upload Travel Reel
      </a>
    </div>
  );
}
