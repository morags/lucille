/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Box,
  Heading,
  Image,
  Textarea,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useLongPress } from "use-long-press";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../utils/db";
import {
  PlainPaper,
  TaskIcon,
  CancelIcon,
  ShareIcon,
  completedTaskCSS, // eslint-disable-line
} from "../../assets";

function BoardDetail({ mdFont, smFont, fontBright }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [changeText, setChangeText] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sharePopup, setSharePopup] = useState(false);
  const { boardId } = useParams();

  const getTasks = useLiveQuery(() =>
    db.tasks.where({ boardid: boardId }).toArray()
  );

  const currentBoardTasksCount = useLiveQuery(() =>
    db.boards.get(parseInt(boardId, 10))
  );

  console.log(currentBoardTasksCount);

  const boardData = getTasks;

  const allHelpers = useLiveQuery(() => db.helpers.toArray());

  const bind = useLongPress(() => {
    setButtonPopup(true);
  });

  const addTask = async () => {
    if (taskInput && !changeText) {
      boardData.find((task) => {
        if (task.id === selectedTask) {
          task.task = taskInput;
          db.tasks.update(task.id, { task: taskInput });
        }
      });
      setIsPopupOpen(false);
      setButtonPopup(false);
    } else {
      await db.tasks.add({
        boardid: boardId,
        task: taskInput,
        completed: "false",
      });

      await db.boards.update(parseInt(boardId, 10), {
        taskscount: currentBoardTasksCount.taskscount + 1,
      });
      setTaskInput("");
      setIsPopupOpen(!isPopupOpen);
    }
  };

  const [taskId, setTaskId] = useState("");

  const completeTask = async (id) => {
    const getTaskData = boardData.filter((taskItem) => taskItem.id === id);
    const currentTaskCompletedValue = JSON.parse(getTaskData[0].completed);
    const reverseValue = !currentTaskCompletedValue;
    db.tasks.update(id, { completed: reverseValue.toString() });
    await db.boards.update(parseInt(boardId, 10), {
      taskscount: currentBoardTasksCount.taskscount - 1,
    });
    setButtonPopup(false);
  };

  const taskCompletedStatus = (id) => {
    const getTaskData = boardData.filter((taskItem) => taskItem.id === id);
    const currentTaskCompletedValue = JSON.parse(getTaskData[0].completed);
    return currentTaskCompletedValue;
  };

  const editTask = (id) => {
    const [updatedTask] = boardData.filter((taskItem) => taskItem.id === id);

    setChangeText(false);
    setTaskInput(updatedTask.task);
    setSelectedTask(id);
    setIsPopupOpen(!isPopupOpen);
  };

  const shareTask = () => {
    setSharePopup(!sharePopup);
  };

  return (
    <Box
      bgImage={PlainPaper}
      bgPosition="top"
      position="relative"
      bgSize="cover"
      bgRepeat="no-repeat"
      h="full"
    >
      <Box overflowY="scroll" p="20px 15px" height="inherit">
      <Heading
        style={{ fontSize: `${mdFont}px`, filter: `contrast(${fontBright}%)` }}
        textAlign="center"
      >
        {currentBoardTasksCount?.name}
      </Heading>
        <Heading
          textAlign="center"
          textDecoration="underline"
          mb="30px"
          style={{
            fontSize: `${mdFont}px`,
            filter: `contrast(${fontBright}%)`,
          }}
        >
          {boardData?.task}
        </Heading>

        {boardData &&
          boardData.map((task, index) => (
            <Box
              key={task.id}
              display="flex"
              alignItems="center"
              pl="20px"
              mb="20px"
            >
              <Heading
                as="h4"
                mr="20px"
                style={{
                  fontSize: `${mdFont}px`,
                  filter: `contrast(${fontBright}%)`,
                }}
              >
                {index + 1}
              </Heading>
              <Heading
                className={taskCompletedStatus(task.id)
                  ? "completedTask"
                  : ""}
                border="4px"
                p="10px"
                w="100%"
                borderColor="gray.400"
                rounded="lg"
                style={{
                  fontSize: `${mdFont}px`,
                  filter: `contrast(${fontBright}%)`,
                  cursor: "pointer"
                }}
                onClick={() => editTask(task.id)}
                {...bind()}
                onMouseEnter={() => setTaskId(task.id)}
              >
                {task.task}
              </Heading>
              <Checkbox
                size="lg"
                backgroundColor="#B6BAB6"
                left="3"
                onChange={() => completeTask(task.id)}
                isChecked={taskCompletedStatus(task.id)}
              >
                Done
              </Checkbox>
            </Box>
          ))}
      </Box>
      {isPopupOpen && (
        <Box
          bgColor="#cccccc"
          p="20px"
          position="absolute"
          left="0"
          right="0"
          top="0"
          height="100%"
          zIndex="2"
          opacity="0.9"
        >
          <Heading
            as="h3"
            display="inline"
            style={{
              fontSize: `${mdFont}px`,
              filter: `contrast(${fontBright}%)`,
            }}
          >
            Add new task
          </Heading>
          <Textarea
            mt="10px"
            placeholder="Enter task"
            border="1px"
            borderColor="gray.500"
            resize="none"
            style={{
              fontSize: `${smFont}px`,
            }}
            fontWeight="bold"
            name="taskName"
            mb="20px"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <Button
            colorScheme="teal"
            w="100px"
            mr="20px"
            style={{
              fontSize: `${smFont}px`,
            }}
            onClick={addTask}
          >
            {changeText ? "Save" : "Update"}
          </Button>
          <Button
            style={{
              fontSize: `${smFont}px`,
            }}
            colorScheme="red"
            w="100px"
            onClick={() => setIsPopupOpen(!isPopupOpen)}
          >
            Close
          </Button>
        </Box>
      )}

      {buttonPopup && (
        <Box
          backgroundColor="#cccccc"
          position="absolute"
          width="full"
          h="full"
          opacity="0.9"
          display="flex"
          alignItems="start"
          justifyContent="center"
          flexDirection="row"
          p="20px"
          top="0"
          left="0"
          onClick={() => setButtonPopup(!buttonPopup)}
        >
          <Box display="flex">
            <Box position="relative">
              <Image
                src={ShareIcon}
                w="120px"
                m="0px 10px"
                cursor="pointer"
                onClick={shareTask}
              />
              <Box position="absolute" display="flex">
                {sharePopup &&
                  allHelpers?.map((helper) => (
                    <Box
                      onClick={() => window.open("mailto:" + helper.email + "?subject=I need your help with this task&body=" + boardData.filter((task) => task.id === taskId)[0].task)} // eslint-disable-line
                      key={helper.id}
                      backgroundColor="#ffffff"
                      w="80px"
                      h="80px"
                      m="10px"
                      p="10px"
                      rounded="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Heading
                        style={{
                          fontSize: `${smFont}px`,
                          filter: `contrast(${fontBright}%)`,
                        }}
                      >
                        {helper.name}
                      </Heading>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
          <Image
            src={CancelIcon}
            w="40px"
            position="absolute"
            top="25px"
            right="25px"
            cursor="pointer"
            onClick={() => setButtonPopup(!buttonPopup)}
          />
        </Box>
      )}

      <Box
        position="absolute"
        right="0px"
        bottom="1px"
        rounded="full"
        boxShadow="md"
        w="80px"
        style={{ cursor: "pointer" }}
        onClick={() => setIsPopupOpen(!isPopupOpen)}
      >
        <Image src={TaskIcon} />
      </Box>
    </Box>
  );
}

export default BoardDetail;
