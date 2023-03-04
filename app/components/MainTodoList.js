import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign } from "react-native-vector-icons";
import { TodoContext } from "../context/todo/TodoContext";
import { CheckBox } from "react-native-elements";
import { closeTask, reopenTask } from "../apis/todoistApi";
import { Picker } from "@react-native-picker/picker";
export default function MainTodoList(props) {
  const { tasks, token, projects, deleteTask } = useContext(TodoContext);

  const [filteredTasks, setfilteredTasks] = useState(tasks);
  const [selectedProject, setSelectedProject] = useState("today");

  useEffect(() => {
    if (tasks) {
      let temp = [];
      if (selectedProject === "today") {
        temp = tasks.filter((d) => {
          if (d.due) {
            var currDate = new Date();
            const dueDate = new Date(d.due.date);
            const shouldRender =
              currDate.toLocaleDateString("en-US") ==
              dueDate.toLocaleDateString("en-US");
            return shouldRender;
          } else return false;
        });
      } else {
        temp = tasks.filter((data) => data.project_id == selectedProject);
        console.log(temp);
      }
      setfilteredTasks([...temp]);
    }
  }, [tasks, selectedProject]);

  const renderLeftActions = (id, taskId) => {
    return (
      <View style={styles.delEditView}>
        <TouchableOpacity
          onPress={() => {
            props.seteditTaskId(taskId);
            props.showEditTaskModel(true);
          }}
          style={styles.deleteContainer}
        >
          <FontAwesome name="edit" style={styles.edit} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteTask(id, taskId)}
          style={styles.deleteContainer}
        >
          <AntDesign name="delete" style={styles.delete} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        marginHorizontal: 5,
      }}
    >
      <View style={styles.headerView}>
        <Text style={styles.header}>Tasks</Text>
        <ProjectSelector
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setCurrentProjectId={props.setCurrentProjectId}
        />
        <TouchableOpacity onPress={() => props.showTaskModel(true)}>
          <FontAwesome name="plus-circle" size={10} style={styles.header} />
        </TouchableOpacity>
      </View>
      {filteredTasks &&
        filteredTasks.map((data, i) => (
          <Swipeable
            renderRightActions={() => renderLeftActions(i, data.id)}
            key={i}
          >
            {!data.completed && (
              <RenderTask key={i} data={data} token={token} />
            )}
          </Swipeable>
        ))}
    </View>
  );
}

const RenderTask = (props) => {
  const [value, setValue] = useState(false);

  const updateTask = (value) => {
    if (value) closeTask(props.token, props.data.id);
    else reopenTask(props.token, props.data.id);

    setValue(value);
  };
  return (
    <View>
      <View style={[styles.card]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CheckBox
            containerStyle={[styles.todoBg]}
            textStyle={styles.title}
            title={props.data.content}
            checked={value}
            onPress={() => updateTask(!value)}
            size={30}
          />
        </View>
      </View>
    </View>
  );
};

const ProjectSelector = (props) => {
  return (
    <View style={styles.pickercontainer}>
      <Picker
        style={styles.pickerbox}
        itemStyle={styles.pickerItem}
        selectedValue={props.selectedProject}
        onValueChange={(itemValue) => {
          props.setSelectedProject(itemValue);
          props.setCurrentProjectId(itemValue);
        }}
      >
        <Picker.Item label="Today" value="today" />

        {props.projects &&
          props.projects.map((d, i) => (
            <Picker.Item label={d.name} value={d.id} key={i} />
          ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerbox: {
    backgroundColor: "rgba(18, 76, 190, 0.527)",
  },
  pickercontainer: {
    width: 160,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    height: 40,
    overflow: "hidden",
  },
  pickerItem: {
    color: "white",
    width: "100%",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  header: {
    color: "white",
    fontSize: 20,
  },
  subheader: {
    color: "grey",
    fontSize: 18,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "rgba(18, 25, 60, 0.8)",
    borderRadius: 15,
    alignItems: "center",
  },
  title: {
    color: "white",
    marginLeft: 10,
    fontSize: 15,
  },
  delete: {
    color: "red",
    fontSize: 28,
  },
  edit: {
    color: "green",
    fontSize: 28,
  },
  deleteContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  delEditView: {
    flexDirection: "row",
  },
  todoBg: {
    backgroundColor: "rgba(71, 255, 255, 0)",
    borderWidth: 0,
  },
});
