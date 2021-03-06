import React from 'react';
import Contaier from '../components/Container';
import Contents from '../components/Contents';
import Button from '../components/Button';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Label = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  letter-spacing: 2px;
`;

const Input = styled.TextInput`
  width: 100%
  border: 1px solid #666666;
  padding: 10px;  
  font-size: 20px;
  margin-bottom: 12px;
`;

function Form( {navigation} ){
  const [date, setDate] = React.useState('');
  const [text, setText] = React.useState('');

  const store = async () => {
    // 비어있으면 저장 비활성화
    if( date === '' ) return;
    if( text === '' ) return;

    // 목록 가져오기
    let list = await AsyncStorage.getItem( 'list' )
    if (list === null){
      list = [];
    } else {
    // string을 parse로 바꿔서 데이터 업데이트
      list = JSON.parse(list);
    }

    list.push({
      date,
      text,
    });
    
    await AsyncStorage.setItem('list', JSON.stringify(list));
    navigation.goBack();
  }

  return(
    <Contaier>
      <Contents>
        <Label>날짜</Label>
        <Input 
          placeholder={'YYYY-MM-DD 형식으로 입력하세요'}
          value={ date }
          onChangeText={ value => setDate( value )}
        />

        <Label>일기 내용</Label>
        <Input 
          multiline={true} 
          numberOfLines={10}
          value={ text }
          onChangeText={ value => setText( value )}  
        />
      </Contents>
      <Button 
        onPress={ store }>
          저장하기
        </Button>
    </Contaier>
  )
}

export default Form;