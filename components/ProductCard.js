import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import tailwind from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProductCard(props) {
  return (
    <View
      style={tailwind('bg-white rounded-l-2xl my-2 rounded-r-2xl flex-row')}>
      <Image
        source={{uri:props.image}}
        style={{width: 62, height: 62, margin: 10}}
      />
      <View style={tailwind('flex-col pt-1 flex-grow')}>
        <Text style={tailwind('text-base')}>{props.name}</Text>
        <Text style={{color: '#CBA960', fontSize: 10}}>Discription</Text>
        <View style={tailwind('flex flex-row items-start justify-between')}>
          <Text style={tailwind(' text-lg flex-grow  font-bold')}>
            Rs.{props.price}
          </Text>
          <TouchableOpacity>
            <Icon
              style={tailwind(' text-4xl items-start font-bold px-2 ')}
              name="md-remove-circle"
              size={18}
              color="black"
            />
          </TouchableOpacity>
          <Text style={tailwind('text-xl items-center py-1 px-2')}>
            {props.quantity}
          </Text>
          <TouchableOpacity>
            <Icon
              style={tailwind(' text-4xl items-start font-bold px-2')}
              name="add-circle"
              size={18}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
