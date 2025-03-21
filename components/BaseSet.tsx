import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, ViewStyle, Animated } from 'react-native'
import { LayoutAnimation } from 'react-native'

interface BaseSetProps {
  children: React.ReactNode
  style?: ViewStyle
  animateResize?: boolean
}

const BaseSet: React.FC<BaseSetProps> = (componentProps: BaseSetProps) => {

    const animationDuration = 300
 
    useEffect(() => {
        const animConfig = {
            duration: animationDuration,
            update: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.scaleXY,
            },
        }
        LayoutAnimation.configureNext(animConfig)
    }, [componentProps.animateResize])

  return <View style={[styles.card, componentProps.style]}>{componentProps.children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    overflow: 'hidden',
  },
})

export default BaseSet