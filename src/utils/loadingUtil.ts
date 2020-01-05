import Loading from "./Loading";

function showLoading(message: string) :any{
  return new Loading({message, duration: 5000}).show();
}

export default showLoading;
