import { v4 as uuidv4 } from "uuid";

const guideData = [
  {
    id: uuidv4(),
    title: "I want to add a list.",
    guide: `Click on the 'LIST' button located on the buttom of the screen, when a notebook appears, input your title of the list.`,
  },
  {
    id: uuidv4(),
    title: "I want to delete, archive and share my list.",
    guide: `Simply click and hold the list for 3 seconds, the buttons will appear in this order: delete, archive and share.`,
  },
  {
    id: uuidv4(),
    title: "I have lost my older lists.",
    guide: `Click the task and rename it. Your update is saved after pressing Update button.`,
  },
  {
    id: uuidv4(),
    title: "I want to share my task.",
    guide: `Click and hold the task for 3 seconds. If you have already saved a contact(s), their names will be appeared to ask for help.`,
  },
  {
    id: uuidv4(),
    title: "I want to add my new task.",
    guide: `Select BOARD tab on the top, click "LIST" icon at the bottom to make a list. After that, click "Task" icon at the bottom to add your task.`,
  },
  {
    id: uuidv4(),
    title: "I want to know if my task is complete.",
    guide: `On the task page, there is a tick box 'DONE' at the end of a task, simply tick that box to indicate that the task is done.`,
  },
  {
    id: uuidv4(),
    title: "I want to add a contact.",
    guide: `On the SETUP tab, click the contact icon at the buttom of the page, 'Add Helper' form will appear, input name and email and upload a photo, then click 'Add new helper' button to save the contact.`,
  },
  {
    id: uuidv4(),
    title: "Font size is too small to read.",
    guide: `Select SETUP tab on the top, click "Aa" icons to adjust the size.`,
  },
  {
    id: uuidv4(),
    title: "I want to change font color.",
    guide: `Select SETUP tab on the top, click "Bulb" icons to adjust grayscale.`,
  },
];

export default guideData;
