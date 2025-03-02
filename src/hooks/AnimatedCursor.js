import React, {useEffect,useRef,useState,useCallback} from "react"

// Simplified device detection - only checks for mobile/touch devices
const IsDevice = (() => {
  if (typeof navigator == 'undefined') return { any: () => false };
  
  return {
    any() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
             (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
    }
  }
})();

function useEventListener(eventName, handler, element = document, options = {}) {
    const savedHandler = useRef()
  
    useEffect(() => {
      savedHandler.current = handler
    }, [handler])
  
    useEffect(() => {
      const isSupported = element && element.addEventListener
      if (!isSupported) return
  
      const eventListener = (event) => savedHandler.current(event)
  
      element.addEventListener(eventName, eventListener, { passive: true, ...options })
  
      return () => {
        element.removeEventListener(eventName, eventListener, { passive: true, ...options })
      }
    }, [eventName, element, options])
  }
  
  /**
 * Cursor Core
 * Replaces the native cursor with a custom animated cursor, consisting
 * of an inner and outer dot that scale inversely based on hover or click.
 *
 * @author Stephen Scaff (github.com/stephenscaff)
 *
 * @param {string} color - rgb color value
 * @param {number} outerAlpha - level of alpha transparency for color
 * @param {number} innerSize - inner cursor size in px
 * @param {number} innerScale - inner cursor scale amount
 * @param {number} outerSize - outer cursor size in px
 * @param {number} outerScale - outer cursor scale amount
 * @param {object} outerStyle - style object for outer cursor
 * @param {object} innerStyle - style object for inner cursor
 * @param {array}  clickables - array of clickable selectors
 *
 */
function CursorCore({
    outerStyle,
    innerStyle,
    color = '220, 90, 90',
    outerAlpha = 0.3,
    innerSize = 8,
    outerSize = 8,
    outerScale = 6,
    innerScale = 0.6,
    trailingSpeed = 8,
    clickables = [
      'a',
      'input[type="text"]',
      'input[type="email"]',
      'input[type="number"]',
      'input[type="submit"]',
      'input[type="image"]',
      'label[for]',
      'select',
      'textarea',
      'button',
      '.link'
    ]
  }) {
    const cursorOuterRef = useRef()
    const cursorInnerRef = useRef()
    const requestRef = useRef()
    const previousTimeRef = useRef()
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isActiveClickable, setIsActiveClickable] = useState(false)
    const [isOnFormField, setIsOnFormField] = useState(false)
    let endX = useRef(0)
    let endY = useRef(0)
    
    // Don't throttle regular cursor movement - it feels unnatural
    const onMouseMove = useCallback(({ clientX, clientY }) => {
      // Update immediately for the inner cursor (feels responsive)
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.left = `${clientX}px`
        cursorInnerRef.current.style.top = `${clientY}px`
      }
      
      // Update coordinates for the trailing effect
      endX.current = clientX
      endY.current = clientY
    }, [])
  
    // Use the original trailing logic with some optimizations
    const animateOuterCursor = useCallback(
      (time) => {
        if (previousTimeRef.current !== undefined) {
          // Use original trailing speed but with direct position updates
          const nextX = coords.x + (endX.current - coords.x) / trailingSpeed
          const nextY = coords.y + (endY.current - coords.y) / trailingSpeed
          
          setCoords({ x: nextX, y: nextY })
          
          if (cursorOuterRef.current) {
            cursorOuterRef.current.style.left = `${nextX}px`
            cursorOuterRef.current.style.top = `${nextY}px`
          }
        }
        
        previousTimeRef.current = time
        requestRef.current = requestAnimationFrame(animateOuterCursor)
      },
      [coords, trailingSpeed]
    )
  
    // Animation frame for the trailing effect
    useEffect(() => {
      requestRef.current = requestAnimationFrame(animateOuterCursor)
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current)
        }
      }
    }, [animateOuterCursor])
  
    // Mouse event handlers
    const onMouseDown = useCallback(() => setIsActive(true), [])
    const onMouseUp = useCallback(() => setIsActive(false), [])
    const onMouseEnterViewport = useCallback(() => setIsVisible(true), [])
    const onMouseLeaveViewport = useCallback(() => setIsVisible(false), [])
  
    useEventListener('mousemove', onMouseMove)
    useEventListener('mousedown', onMouseDown)
    useEventListener('mouseup', onMouseUp)
    useEventListener('mouseover', onMouseEnterViewport)
    useEventListener('mouseout', onMouseLeaveViewport)
  
    // Cursor hover/active state
    useEffect(() => {
      if (!cursorInnerRef.current || !cursorOuterRef.current) return
      
      if (isActive) {
        cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${innerScale})`
        cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${outerScale})`
      } else {
        cursorInnerRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
        cursorOuterRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    }, [innerScale, outerScale, isActive])
  
    // Cursor click state
    useEffect(() => {
      if (!cursorInnerRef.current || !cursorOuterRef.current) return
      
      if (isActiveClickable) {
        cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${innerScale * 1.2})`
        cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${outerScale * 1.4})`
      }
    }, [innerScale, outerScale, isActiveClickable])
  
    // Cursor visibility state
    useEffect(() => {
      if (!cursorInnerRef.current || !cursorOuterRef.current) return
      
      if (isVisible) {
        cursorInnerRef.current.style.opacity = isOnFormField ? '0' : '1'
        cursorOuterRef.current.style.opacity = isOnFormField ? '0' : '1'
      } else {
        cursorInnerRef.current.style.opacity = '0'
        cursorOuterRef.current.style.opacity = '0'
      }
    }, [isVisible, isOnFormField])
  
    useEffect(() => {
      const formFields = document.querySelectorAll('input, textarea, select')
      
      // Handle form fields
      const handleFormFieldMouseOver = () => {
        setIsOnFormField(true)
        document.body.style.cursor = 'auto'
        
        if (cursorInnerRef.current) cursorInnerRef.current.style.opacity = '0'
        if (cursorOuterRef.current) cursorOuterRef.current.style.opacity = '0'
      }
      
      const handleFormFieldMouseOut = () => {
        setIsOnFormField(false)
        document.body.style.cursor = 'none'
        
        if (cursorInnerRef.current) cursorInnerRef.current.style.opacity = '1'
        if (cursorOuterRef.current) cursorOuterRef.current.style.opacity = '1'
      }
      
      formFields.forEach(el => {
        el.style.cursor = 'auto'
        el.addEventListener('mouseover', handleFormFieldMouseOver)
        el.addEventListener('mouseout', handleFormFieldMouseOut)
      })
      
      // Handle clickable elements
      const clickableEls = [...document.querySelectorAll(clickables.join(','))].filter(
        el => !el.matches('input, textarea, select')
      )
      
      const handleClickableMouseOver = () => setIsActive(true)
      const handleClickableMouseOut = () => {
        setIsActive(false)
        setIsActiveClickable(false)
      }
      const handleClickableMouseDown = () => setIsActiveClickable(true)
      const handleClickableMouseUp = () => setIsActive(true)
      
      clickableEls.forEach(el => {
        el.style.cursor = 'none'
        el.addEventListener('mouseover', handleClickableMouseOver)
        el.addEventListener('mouseout', handleClickableMouseOut)
        el.addEventListener('mousedown', handleClickableMouseDown)
        el.addEventListener('mouseup', handleClickableMouseUp)
      })
      
      return () => {
        formFields.forEach(el => {
          el.removeEventListener('mouseover', handleFormFieldMouseOver)
          el.removeEventListener('mouseout', handleFormFieldMouseOut)
        })
        
        clickableEls.forEach(el => {
          el.removeEventListener('mouseover', handleClickableMouseOver)
          el.removeEventListener('mouseout', handleClickableMouseOut)
          el.removeEventListener('mousedown', handleClickableMouseDown)
          el.removeEventListener('mouseup', handleClickableMouseUp)
        })
      }
    }, [clickables])
  
    // Cursor styles
    const styles = {
      cursorInner: {
        zIndex: 999,
        display: 'block',
        position: 'fixed',
        borderRadius: '50%',
        width: innerSize,
        height: innerSize,
        pointerEvents: 'none',
        backgroundColor: `rgba(${color}, 1)`,
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out',
        left: 0,
        top: 0,
        opacity: 0,
        ...(innerStyle && innerStyle)
      },
      cursorOuter: {
        zIndex: 999,
        display: 'block',
        position: 'fixed',
        borderRadius: '50%',
        pointerEvents: 'none',
        width: outerSize,
        height: outerSize,
        backgroundColor: `rgba(${color}, ${outerAlpha})`,
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
        left: 0,
        top: 0,
        opacity: 0,
        ...(outerStyle && outerStyle)
      }
    }
  
    // Hide global cursor
    useEffect(() => {
      document.body.style.cursor = 'none'
      
      return () => {
        document.body.style.cursor = 'auto'
      }
    }, [])
  
    return (
      <>
        <div ref={cursorOuterRef} style={styles.cursorOuter} />
        <div ref={cursorInnerRef} style={styles.cursorInner} />
      </>
    )
  }
  
  /**
   * AnimatedCursor
   * Calls and passes props to CursorCore if not a touch/mobile device.
   */
  function AnimatedCursor({
    outerStyle,
    innerStyle,
    color,
    outerAlpha,
    innerSize,
    innerScale,
    outerSize,
    outerScale,
    trailingSpeed,
    clickables
  }) {
    if (typeof navigator !== 'undefined' && IsDevice.any()) {
      return <React.Fragment></React.Fragment>
    }
    return (
      <CursorCore
        outerStyle={outerStyle}
        innerStyle={innerStyle}
        color={color}
        outerAlpha={outerAlpha}
        innerSize={innerSize}
        innerScale={innerScale}
        outerSize={outerSize}
        outerScale={outerScale}
        trailingSpeed={trailingSpeed}
        clickables={clickables}
      />
    )
  }
  
 
export default AnimatedCursor