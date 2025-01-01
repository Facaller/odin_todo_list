import { eachDayOfInterval, startOfDay, endOfDay, addDays } from 'date-fns';

// Example function to get tasks for the next 7 days
function getTasksForNextSevenDays(tasks) {
  // Get today's date
  const today = new Date();

  // Set the start and end date for the next 7 days
  const startDate = startOfDay(today); // Start at the beginning of today
  const endDate = endOfDay(addDays(today, 6)); // End at the end of the seventh day

  // Get an array of all dates in the next 7 days
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

  // Filter tasks that fall within the next 7 days
  const tasksForNextSevenDays = tasks.filter(task => {
    // Assuming task.dueDate is a JavaScript Date object
    return dateRange.some(date => task.dueDate.getTime() === date.getTime());
  });

  return tasksForNextSevenDays;
}

import { isToday, endOfDay } from 'date-fns';

getTasksDueToday() {
    return this.tasks.filter(task => {
        // Ensure task.date is a Date object, assuming it's already in a valid format
        const taskDate = new Date(task.date);
        
        // Check if task type is 'todo', it's not completed, and the date is today
        const isDueToday = isToday(taskDate); // Returns true if taskDate is today
        const isIncomplete = !task.isComplete; // Returns true if the task is not complete
        
        return task.type === 'todo' && task.date && isDueToday && isIncomplete;
    });
}
