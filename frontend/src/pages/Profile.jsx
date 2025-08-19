import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="card w-full max-w-lg mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
          <p>No user data provided.</p>
        </div>
      </div>
    );
  }

  return (
      <div className="card w-full max-w-6xl p-6 bg-base-100 mx-auto">
        <div className="card-body p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left sm:space-x-6 space-y-4 sm:space-y-0">
              <div className="avatar">
                <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.avatarUrl}
                    alt={`${user.username}'s Avatar`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/160x160/fca5a5/1f2937?text=Error`;
                    }}
                  />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold">{user.username}</h1>
                <p className="text-xl text-base-content/70 mt-1">
                  {user.email}
                </p>
                <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4 mt-2 text-lg text-base-content/90">
                  <p>
                    Joined on {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                  <span className="text-base-content/50 hidden sm:block">
                    |
                  </span>
                  <p>Posts: {user.posts.length}</p>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col gap-3">
              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-ghost">Delete</button>
            </div>
          </div>
        </div>
      </div>

  );
}

export default Profile;
