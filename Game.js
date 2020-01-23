import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableNativeFeedback, Alert, BackHandler } from 'react-native';

const GRID_LENGTH = 3;
let turn = 'X';

const Game = () => {
  const [grid, setGrid] = useState([]);

  const getWinner = (v1, v2, v3) => {
    if (v1 === 0) {
      return false;
    }
    if (v1 !== v2) {
      return false;
    }
    if (v1 !== v3) {
      return false;
    }
    Alert.alert(
      `Congratulations!`,
      `${v1 === 1 ? "X" : "0"} is Winner`,
      [
        {
          text: 'Close',
          onPress: () => BackHandler.exitApp(),
          style: 'cancel',
        },
        {
          text: 'Play Again',
          onPress: () => initializeGrid(),
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  const checkWinner = () => {
    console.log(grid);
    getWinner(grid[0][0], grid[0][1], grid[0][2]);
    getWinner(grid[1][0], grid[1][1], grid[1][2]);
    getWinner(grid[2][0], grid[2][1], grid[2][2]);

    getWinner(grid[0][0], grid[1][0], grid[2][0]);
    getWinner(grid[0][1], grid[1][1], grid[2][1]);
    getWinner(grid[0][2], grid[1][2], grid[2][2]);

    getWinner(grid[0][0], grid[1][1], grid[2][2]);
    getWinner(grid[0][2], grid[1][1], grid[2][0]);
  };

  const initializeGrid = () => {
    const tempGrid = [];
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
      const tempArray = [];
      for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
        tempArray.push(0);
      }
      tempGrid.push(tempArray);
    }
    setGrid(tempGrid);
  };

  const onBoxClick = (colIdx, rowIdx) => () => {
    if (grid[colIdx][rowIdx] === 0) {
      const newGrid = [...grid];
      newGrid[colIdx][rowIdx] = turn === 'X' ? 1 : 2;
      if (turn === 'X') {
        turn = 'O';
      } else {
        turn = 'X';
      }
      setGrid(newGrid);
    }
    checkWinner();
  };

  const getBox = (index, colIdx, rowIdx) => {
    let backgroundColor = 'red';
    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      backgroundColor = 'blue';
    }
    const gridValue = grid[colIdx][rowIdx];
    let content = '-';
    if (gridValue === 1) {
      content = 'X';
    } else if (gridValue === 2) {
      content = 'O';
    }
    return (
      <TouchableNativeFeedback key={index} onPress={onBoxClick(colIdx, rowIdx)}>
        <View style={{ ...styles.boxStyle, backgroundColor }}>
          <Text style={styles.content}>{content}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const getRow = (row, colIdx) => {
    return row.map((item, index) => {
      return getBox(index, colIdx, index);
    });
  };

  const getColumns = () => {
    return grid.map((row, index) => {
      return (
        <View style={styles.rowStyle} key={index}>
          {getRow(row, index)}
        </View>
      );
    });
  };

  const renderMainGrid = () => {
    return (
      <View style={styles.fullFlex}>
        <View style={styles.columnsStyle}>{getColumns()}</View>
      </View>
    );
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  if (grid.length === 0) {
    return <Text> initializing </Text>;
  }
  return renderMainGrid();
};

const styles = StyleSheet.create({
  columnsStyle: {
    flexDirection: 'column',
  },
  rowStyle: {
    flexDirection: 'row',
  },
  boxStyle: {
    width: 100,
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  fullFlex: {
    display: 'flex',
  }
});

export default Game;
