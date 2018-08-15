const deleteButtonsRaw = document.querySelectorAll("._post_content .ui_actions_menu .ui_actions_menu_item:first-child");
const deleteButtons = [...deleteButtonsRaw];

const deletePost = (selector) => {
  selector.click();
};

for (let i = 0; i < deleteButtons.length; i++) {
  deletePost(deleteButtons[i]);
}
