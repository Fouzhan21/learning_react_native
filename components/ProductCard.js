import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProductCard(props) {

  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    // console.log('Cart Changed From Produt Component ')
    let thisProduct = props.cart.find(item => item.price_variation[0].variation_id === props.id)
    if (thisProduct) {
      // console.log(`${thisProduct.product_name} Found in Cart in Quantity --> ${thisProduct.quantity}`)
      setQuantity(thisProduct.quantity)
    }
    else{
      setQuantity(0)
    }
  }, [props.cart])

  return (
    <View
      style={tailwind('bg-white rounded-l-2xl my-2 rounded-r-2xl flex-row')}>
      <Image
        source={{ uri: props.image }}
        style={{ width: 62, height: 62, margin: 10 }}
      />
      <View style={tailwind('flex-col pt-1 flex-grow')}>
        <Text style={tailwind('text-base')}>{props.name}</Text>
        <Text style={{ color: '#CBA960', fontSize: 10 }}>Discription</Text>
        <View style={tailwind('flex flex-row items-start justify-between')}>
          <Text style={tailwind(' text-lg flex-grow  font-bold')}>
            Rs.{props.price}
          </Text>
          {
            quantity > 0 ? (
              <>
                <TouchableOpacity onPress={() => props.decrementAction(props.id)  }>
                  <Icon
                    style={tailwind(' text-4xl items-start font-bold px-2 ')}
                    name="md-remove-circle"
                    size={18}
                    color="black"
                  />
                </TouchableOpacity>
                <Text style={tailwind('text-xl items-center py-1 px-2')}>
                  {quantity}
                </Text>
                <TouchableOpacity onPress={() => props.incrementAction(props.id)  }>
                  <Icon
                    style={tailwind(' text-4xl items-start font-bold px-2')}
                    name="add-circle"
                    size={18}
                    color="black"
                  />
                </TouchableOpacity>
              </>
            ) : (

              <TouchableOpacity onPress={() => props.incrementAction(props.id)} >
                <Icon
                  style={tailwind(' text-4xl items-start font-bold px-2')}
                  name="add-circle"
                  size={18}
                  color="black"
                />
              </TouchableOpacity>

            )
          }

        </View>
      </View>
    </View >
  );
}
