import { useContext, useState } from "react";
import GitHubContext from "../../context/github/GitHubContext";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GitHubAction";

function UserSearch() {
  const [text, setText] = useState("");
  const { users, dispatch } = useContext(GitHubContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("내용을 입력해 주세요.", "error");
    } else {
      // 검색어로 유저찾기
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(text);
      dispatch({ type: "GET_USERS", payload: users });
      setText("");
    }
  };

  return (
    <div
      className="grid grid-cols-1 xl:grid-cols-2
    lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8"
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                onChange={handleChange}
                value={text}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-3/6 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            className="btn btn-ghost btn-lg"
            onClick={() => dispatch({ type: "CLEAR_USERS" })}
          >
            CLEAR
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
