/* eslint-disable no-console */
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

  // React hook to handle the provided task text
  const [taskInput, setTaskInput] = useState("");

  // React hook to check if the popup for extra options should be shown or not
  const [buttonPopup, setButtonPopup] = useState(false);

  // React hook to check if the popup for share with helpers should be shown or not
  const [sharePopup, setSharePopup] = useState(false);

  // The current boardid variable
  const { boardId } = useParams();


  // Get all the tasks for the current active board from the db
  const getTasks = useLiveQuery(() =>
    db.tasks.where({ boardid: boardId }).toArray()
  );

  // Get the number of current tasks from the board table for the active board
  const currentBoardTasksCount = useLiveQuery(() =>
    db.boards.get(parseInt(boardId, 10))
  );

  const boardData = getTasks;

  // Get all the helpers from the db
  const allHelpers = useLiveQuery(() => db.helpers.toArray());

  // bind funtion to user with the useLongPress hook (external library)
  const bind = useLongPress(() => {
    // Change show pop up value to true when long press is detected
    setButtonPopup(true);
  });

  // React hook to get the id for the tasks an action been performed on
  const [taskId, setTaskId] = useState("");

  // The function to handle the task completion operation
  const completeTask = async (id) => {
    try {
    // Get the specific task an action been performed on
    const getTaskData = boardData.filter((taskItem) => taskItem.id === id);
    // Get its current complete value and parse it as a boolean type
    const currentTaskCompletedValue = JSON.parse(getTaskData[0].completed);
    // Reverese the value to either mark it as completed or uncompleted and save it into the var
    const reverseValue = !currentTaskCompletedValue;

    // Check if the current value is true
    if(currentTaskCompletedValue === true){
      // Increase the number of tasks by one
      await db.boards.update(parseInt(boardId, 10), {
        taskscount: currentBoardTasksCount.taskscount + 1,
      });
    } else {
      // If not, decrease the number of tasks by one
      await db.boards.update(parseInt(boardId, 10), {
        taskscount: currentBoardTasksCount.taskscount - 1,
      });
    }
    // Save the new complete value in the db
    db.tasks.update(id, { completed: reverseValue.toString() });
    // Remove the popup
    } catch (e) {
      console.log("Failed to perform DB actions => ", e);
    }

    setButtonPopup(false);
  };

  // Get the tasks completed status from the db
  const taskCompletedStatus = (id) => {
    const getTaskData = boardData.filter((taskItem) => taskItem.id === id);
    const currentTaskCompletedValue = JSON.parse(getTaskData[0].completed);
    return currentTaskCompletedValue;
  };

  // A function to handle the task edit operation
  const editTask = (id) => {
    // Select the tasks the action been performed on
    const [updatedTask] = boardData.filter((taskItem) => taskItem.id === id);
    // Update its value in the db
    db.tasks.update(id, { change: "true" });
    // Call the hook callback function to update the state with the new value
    setTaskInput(updatedTask.task);
  };

  // The function to handle the share with helper functionality
  const shareTask = (e) => {
    // This method is to make sure the onClick event listener was meant for this specific component
    e.stopPropagation();
    // Reverse the share popup value
    setSharePopup(!sharePopup);
  };

  // This is used to change the screen view to the newly created task
  const newTaskRef = useRef(null);
  const executeScroll = () => newTaskRef.current.scrollIntoView();

  // The function that handles the adding of new task in the db
  const addTaskNew = async () => {
    try {
      await db.tasks.add({
        boardid: boardId,
        task: "",
        completed: "false",
        new: "true",
        change: "false"
      });
      // and update the number of current tasks
      await db.boards.update(parseInt(boardId, 10), {
        taskscount: currentBoardTasksCount.taskscount + 1,
      });
    } catch (e) {
      console.log("Failed to perform db actions => ", e);
    }
    
    // Scroll the view to the new task location
    executeScroll();
  };

  // Update the newly creatd task value when clicking anywhere on the screen
  const changeTaskNewValue = async (task) => {
    try {
      db.tasks.update(task[0], { new: "false", change: "false", task: task[1] });
    } catch (error) {
      console.log("Failed to update task => ", error);
    }
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
          boardData.map((task, index) => // Check if there are any tasks, if yes render the below
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
                  autoFocus
                  key={task.id}
                  ref={newTaskRef}
                  defaultValue={task.new === "true" ? "" : taskInput}
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

      {buttonPopup && ( // If the popup state is true then render the below components
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
