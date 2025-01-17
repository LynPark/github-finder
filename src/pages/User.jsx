import { useContext, useEffect } from "react";
import GitHubContext from "../context/github/GitHubContext";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/layout/Spinner";
import { FaCodepen, FaUserFriends, FaUsers } from "react-icons/fa";
import RepoList from "../components/layout/repos/RepoList";
import { getUserAndRepos } from "../context/github/GitHubAction";

function User() {
  const { user, loading, repos, dispatch } = useContext(GitHubContext);
  const params = useParams();
  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    hireable,
  } = user;

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const getUserData = async () => {
      const userData = await getUserAndRepos(params.login);
      dispatch({ type: "GET_USER_AND_REPOS", payload: userData });
    };
    getUserData();
  }, [dispatch, params.login]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="w-full mx-auto lg:w-10/12">
        <div className="mb-4">
          <Link to="/" className="btn btn-ghost">
            Back To Search
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className="rounded-lg shadow-xl card image-full">
              <figure>
                <img src={avatar_url} alt="" />
              </figure>
              <div className="card-body justify-end">
                <h2 className="card-title mb-0">{name}</h2>
                <p className="flex-grow-0">{login}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl card-title">
                {name}
                <div className="ml-2 mr-1 badge badge-success">{type}</div>
                {hireable && (
                  <div className="mx-1 badge badge-info">Hireable</div>
                )}
              </h1>
              <p>{bio}</p>
              <div className="mt-4 card-actions">
                <a
                  href={html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  Visit GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-lg shadow-md bg-base-100 stats">
          {location && (
            <div className="stat">
              <div className="stat-title text-md">Location</div>
              <div className="stat-value text-lg">{location}</div>
            </div>
          )}
          {blog && (
            <div className="stat">
              <div className="stat-title text-md">Website</div>
              <div className="text-lg stat-value">
                <a href={blog} target="_blank" rel="noreferrer">
                  {blog}
                </a>
              </div>
            </div>
          )}
          {twitter_username && (
            <div className="stat">
              <div className="stat-title text-md">Twitter</div>
              <div className="text-lg stat-value">
                <a
                  href={`https://x.com/${twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {twitter_username}
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="w-full rounded-lg shadow-md bg-base-100 stats">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="stat">
              <div className="stat-figure text-error">
                <FaUsers className="text-3xl md:text-5xl" />
              </div>
              <div className="stat-title pr-5">Followers</div>
              <div className="stat-value text-3xl md:text-4xl pr-5">
                {followers}
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-accent">
                <FaUserFriends className="text-3xl md:text-5xl" />
              </div>
              <div className="stat-title pr-5">Following</div>
              <div className="stat-value text-3xl md:text-4xl pr-5">
                {following}
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-primary">
                <FaCodepen className="text-3xl md:text-5xl" />
              </div>
              <div className="stat-title pr-5">Public Repos</div>
              <div className="stat-value text-3xl md:text-4xl pr-5">
                {public_repos}
              </div>
            </div>
          </div>
        </div>
        <RepoList repos={repos} />
      </div>
    </>
  );
}

export default User;
