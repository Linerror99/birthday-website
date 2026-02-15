import React from 'react';
import { motion } from 'framer-motion';
import { TimelineEvent as TimelineEventType } from '../../data/timelineEvents';
interface TimelineEventProps {
  event: TimelineEventType;
  index: number;
  isLeft: boolean;
}
export function TimelineEvent({ event, index, isLeft }: TimelineEventProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        margin: '-100px'
      }}
      transition={{
        delay: index * 0.2,
        duration: 0.6
      }}
      className={`relative flex items-center mb-16 ${isLeft ? 'md:flex-row-reverse' : ''} flex-col md:flex-row`}>

      {/* Content */}
      <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right' : ''}`}>
        <motion.div
          whileHover={{
            scale: 1.02
          }}
          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200">

          {/* Date Badge */}
          <div
            className={`inline-block mb-4 ${isLeft ? 'md:float-right md:ml-4' : 'md:float-left md:mr-4'}`}>

            <span className="px-4 py-2 bg-gradient-to-r from-amber-400 to-rose-400 text-white font-bold rounded-full text-sm">
              {event.date}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-amber-900 mb-3 flex items-center gap-2 justify-start md:justify-start">
            {!isLeft && <span className="text-3xl">{event.icon}</span>}
            <span>{event.title}</span>
            {isLeft && <span className="text-3xl">{event.icon}</span>}
          </h3>

          {/* Description */}
          <p className="text-amber-900/70 mb-4 leading-relaxed">
            {event.description}
          </p>

          {/* Image */}
          {event.image &&
          <div className="rounded-xl overflow-hidden">
              <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover" />

            </div>
          }
        </motion.div>
      </div>

      {/* Timeline Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center z-10">
        <motion.div
          initial={{
            scale: 0
          }}
          whileInView={{
            scale: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            delay: index * 0.2 + 0.3,
            type: 'spring',
            stiffness: 200
          }}
          className="w-6 h-6 bg-gradient-to-br from-amber-400 to-teal-400 rounded-full border-4 border-cream-50 shadow-lg" />

      </div>

      {/* Mobile Dot */}
      <div className="md:hidden w-6 h-6 bg-gradient-to-br from-amber-400 to-teal-400 rounded-full border-4 border-cream-50 shadow-lg mb-4" />
    </motion.div>);

}