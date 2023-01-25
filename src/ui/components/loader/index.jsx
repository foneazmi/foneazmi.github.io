import { useSelector, useDispatch } from "react-redux";
import { loadingEnd } from "../../../stores/actions";
export const Loader = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(({ global }) => global);
  return (
    loading && (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Loading</h3>
          <p className="py-4">Please wait</p>
          <div className="modal-action">
            <label className="btn" onClick={() => dispatch(loadingEnd())}>
              Close Now !
            </label>
          </div>
        </div>
      </div>
    )
  );
};
