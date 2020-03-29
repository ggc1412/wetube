import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
let delSpanList;
if (commentList) {
  delSpanList = commentList.querySelectorAll(".jsCommentDelete");
}
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = async e => {
  const li = e.target.parentNode;
  const idSpan = li.querySelector(".jsCommentId");
  if (idSpan) {
    const id = idSpan.innerHTML;
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
      url: `/api/${videoId}/comment`,
      method: "DELETE",
      data: {
        commentId: id
      }
    });
    if (response.status === 200) {
      li.parentNode.removeChild(li);
      decreaseNumber();
    }
  } else {
    li.parentNode.removeChild(li);
    decreaseNumber();
  }
};

const addComment = comment => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delSpan = document.createElement("span");
  delSpan.addEventListener("click", deleteComment);
  span.innerHTML = comment;
  delSpan.innerHTML = " 💥";
  li.appendChild(span);
  li.appendChild(delSpan);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  delSpanList.forEach(delSpan => {
    delSpan.addEventListener("click", deleteComment);
  });
}

if (addCommentForm) {
  init();
}
