import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader } from 'lucide-react';
import { personalInfo } from '../data/mock';
import { toast } from '../hooks/use-toast';
import { contactService } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactService.send(formData);
      toast({
        title: \"Mesajınız gönderildi!\",
        description: \"En kısa sürede size geri dönüş yapacağım.\",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: \"Hata!\",
        description: \"Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.\",
        variant: \"destructive\"
      });
    } finally {
      setIsSubmitting(false);
    }
  };