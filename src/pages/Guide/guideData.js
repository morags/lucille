import { v4 as uuidv4 } from 'uuid';

const guideData = [
  {
    id: uuidv4(),
    title: '文字が小さいです。Too small to read letters',
    guide: `設定 SETTINGS ボタンを選択し、フォントサイズを変更することが可能です。右側のAa ボタンを押せば文字が大きくなります。左側のボタンはその逆です。You can adjust your font size. Go Settings and press circle buttons.`,
  },
  {
    id: uuidv4(),
    title: 'I cannot see the app well.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam`,
  },
  {
    id: uuidv4(),
    title: 'I cannot hear the sounds.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam`,
  },
  {
    id: uuidv4(),
    title: 'I cannot share tasks.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam`,
  },
  {
    id: uuidv4(),
    title: 'I have lost my older lists.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam`,
  },
  {
    id: uuidv4(),
    title: 'I want to delete my lists.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam`,
  },
  {
    id: uuidv4(),
    title: 'I want to archive my tasks.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam`,
  },
];

export default guideData;
