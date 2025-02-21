'use client';
import './styles.scss';
import RightArrowIcon from '../SVGs/RightArrowIcon';
import { useState } from 'react';
import GetInTouch from '../GetInTouch';
import { CONVO_TEXT, GET_IN_TOUCH_TEXT } from '@/constants';
import { Contact } from '@/types';
interface StartConversationProps {
  contacts: Contact[];
  convoText: string;
  contactInfoText: string;
  getInTouchText: string;
}

export default function StartConversation({ contacts, convoText, contactInfoText, getInTouchText }: StartConversationProps) {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="conversation-container">
      <div className="convo-image">
        <img alt="Start a conversation" src="/conversation.png" className="convo-image" />
      </div>
      {!showContactForm ? (
        <div className="text-container">
          <div>
            <p className="convo-text">{CONVO_TEXT}</p>
            <p className="contact-line">{contactInfoText}</p>
          </div>

          <div className="grid-container">
            {contacts.map((contact) => (
              <div className="grid-item">
                <p className="contact-title">{contact.title}</p>
                <div className="contact-details">
                  <p>{contact.loc}</p>
                  <p>{contact.license}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="get-in-touch" onClick={() => setShowContactForm(true)}>
            <p>{GET_IN_TOUCH_TEXT}</p>
            <RightArrowIcon />
          </div>
        </div>
      ) : (
        <GetInTouch goBack={() => setShowContactForm(false)} />
      )}
    </div>
  );
}
