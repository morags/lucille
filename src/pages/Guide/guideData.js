import { v4 as uuidv4 } from 'uuid';

const guideData = [
  {
    id: uuidv4(),
    title: 'I want to add my new task.',
    guide: `Select BOARD tab on the top, click "LIST" icon at the bottom to make a list. After that, click "Task" icon at the bottom to put your task on it.`,
  },
  {
    id: uuidv4(),
    title: 'Font size is too small to read.',
    guide: `Select SETUP tab on the top, click "Aa" circular icons to adjust the size.`,
  },
  {
    id: uuidv4(),
    title: 'I want to change font color.',
    guide: `Select SETUP tab on the top, click "Bulb" circular icons to adjust grayscale.`,
  },
  {
    id: uuidv4(),
    title: 'I want to update my task.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam`,
  },
  {
    id: uuidv4(),
    title: 'I have lost my older lists.',
    guide: `Click the task itself and rename it. Your update is saved after pressing Update button.`,
  },
  {
    id: uuidv4(),
    title: 'I want to share my task.',
    guide: `Long press on the task first and press share icon later. If you have already saved a contact(s), their name are appeared to ask for help.`,
  },
];

export default guideData;
