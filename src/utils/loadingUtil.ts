import Loading from "./Loading";

function showLoading(message: string) :any{
  return new Loading({message, duration: 0}).show();
}

export default showLoading;
