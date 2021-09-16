// Importação do que será utilizado
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task' // Importa o componente criado em ./componentes/Task.js

export default function App() {
  const [task, setTask] = useState()
  const [taskItems, setTaskItems] = useState([])

  const handleAddTask = () => {
    Keyboard.dismiss()      // Fecha o teclado
    if (task !== null) {     // Se task não é vazia, 
      setTaskItems([...taskItems, task]) // define a lista de tasks anterior mais a nova task 
      setTask(null)         // Limpa o input
    }
  }

  const completeTask = index => {
    let itemsCopy = [...taskItems]    // Faz uma cópia da lista de itens
    itemsCopy.splice(index, 1)        // Remove o item baseado no index
    setTaskItems(itemsCopy)           // Define a cópia da lista como lista de itens atual
  }

  return (
    <View style={styles.container}>

      {/* Necessário o ScrollView para liberar o scroll na página */}
      <ScrollView>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>

          {/* lista de Tasks */}
          <View style={styles.items}>
            {
              taskItems.map((item, index) => { // Faz um loop nos itens e
                return (                       // retorna o item dentro do componente Task
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "iOS" ? "padding" : "height"}
        style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

// Estilos que serão utilizados
const styles = StyleSheet.create({    // Cria os estilos que serão utilizados
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 50,
    paddingBottom: 70,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 60,
    width: '75%',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 20,
  },
});
