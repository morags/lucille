/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
import {
  Box,
  Heading,
  Image,
  Textarea,
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
  const [taskInput, setTaskInput] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [sharePopup, setSharePopup] = useState(false);
  const { boardId } = useParams();

  const getTasks = useLiveQuery(() =>
    db.tasks.where({ boardid: boardId }).toArray()
  );

  const currentBoardTasksCount = useLiveQuery(() =>
    db.boards.get(parseInt(boardId, 10))
  );

  const boardData = getTasks;

  const allHelpers = useLiveQuery(() => db.helpers.toArray());

  const bind = useLongPress(() => {
    setButtonPopup(true);
  });

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
    db.tasks.update(id, { change: "true" });
    setTaskInput(updatedTask.task);
  };
  const shareTask = (e) => {
    e.stopPropagation();
    setSharePopup(!sharePopup);
  };
  const newTaskRef = useRef(null);
  const executeScroll = () => newTaskRef.current.scrollIntoView();

  const addTaskNew = async () => {
    await db.tasks.add({
      boardid: boardId,
      task: "",
      completed: "false",
      new: "true",
      change: "false"
    });
    executeScroll();
  };

  const changeTaskNewValue = async (task) => {
    db.tasks.update(task[0], { new: "false", change: "false", task: task[1] });
    setTaskInput("")
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
          style={{
            fontSize: `${mdFont + 5}px`,
            filter: `contrast(${fontBright}%)`,
          }}
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
          boardData.map((task, index) =>
            task.new === "true" || task.change === "true" ? (
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
                    fontSize: `${mdFont - 10}px`,
                    filter: `contrast(${fontBright}%)`,
                  }}
                >
                  {index + 1}
                </Heading>
                <Textarea
                  key={task.id}
                  ref={newTaskRef}
                  defaultValue={taskInput}
                  resize="none"
                  onBlur={(e) => changeTaskNewValue([task.id, e.target.value])}
                  placeholder="Add new task"
                  border="4px"
                  p="10px"
                  w="100%"
                  borderColor="gray.400"
                  rounded="lg"
                  style={{
                    fontSize: `${mdFont}px`,
                    filter: `contrast(${fontBright - 10}%)`,
                    cursor: "pointer",
                  }}
                  fontWeight="bold"
                />
              </Box>
            ) : (
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
                    fontSize: `${mdFont - 10}px`,
                    filter: `contrast(${fontBright}%)`,
                  }}
                >
                  {index + 1}
                </Heading>
                <Heading
                  className={
                    taskCompletedStatus(task.id) ? "completedTask" : ""
                  }
                  border="4px"
                  p="10px"
                  w="100%"
                  borderColor="gray.400"
                  rounded="lg"
                  style={{
                    fontSize: `${mdFont}px`,
                    filter: `contrast(${fontBright}%)`,
                    cursor: "pointer",
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
            )
          )}
      </Box>

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
                      onClick={() =>window.open("mailto:" +helper.email +"?subject=I need your help with this task&body=" +boardData.filter((task) => task.id === taskId)[0].task)} // eslint-disable-line
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
        onClick={addTaskNew}
      >
        <Image src={TaskIcon} />
      </Box>
    </Box>
  );
}

export default BoardDetail;
