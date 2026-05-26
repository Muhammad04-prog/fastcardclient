import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from '../components/ui/toast';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = t("contact.nameRequired", "Please enter your name");
    if (!formData.email.trim()) {
      newErrors.email = t("contact.emailRequired", "Please enter a valid email");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("contact.emailRequired", "Please enter a valid email");
    }
    if (!formData.phone.trim()) newErrors.phone = t("contact.phoneRequired", "Please enter your phone");
    if (!formData.message.trim()) newErrors.message = t("contact.messageRequired", "Please enter your message");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Show first validation message via toast
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError);
      return;
    }

    console.log('Contact form values:', formData);
    toast.success(t("contact.contactSaved") || "Contact information sent successfully!");
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pt-[40px] pb-[100px] bg-gray-50/50">
      <div className="max-w-[1400px] m-auto px-[20px] lg:px-0">
        <div className="text-[14px] text-gray-500 mb-[40px]">
          <a href="/" className="hover:text-black">{t("navbar.home")}</a> / 
          <span className="text-black font-[500]">{t("navbar.contact")}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-[30px]">
          <div className="lg:w-[340px] flex-shrink-0">
            <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-[35px] h-full">
              
              <div className="border-b border-gray-200 pb-[30px] mb-[30px]">
                 <div className="flex items-center gap-[15px] mb-[20px]">
                   <div className="w-[40px] h-[40px] bg-[#DB4444] rounded-full flex items-center justify-center text-white text-[20px]">
                     📞
                   </div>
                   <h3 className="text-[16px] font-[500] text-gray-900">{t("contact.callToUs")}</h3>
                 </div>
                 <p className="text-[14px] text-gray-600 mb-[15px]">{t("contact.available")}</p>
                 <p className="text-[14px] font-[500] text-gray-900">{t("signup.phone")}: +8801611112222</p>
              </div>

              {/* Write section */}
              <div>
                 <div className="flex items-center gap-[15px] mb-[20px]">
                   <div className="w-[40px] h-[40px] bg-[#DB4444] rounded-full flex items-center justify-center text-white text-[20px]">
                     ✉️
                   </div>
                   <h3 className="text-[16px] font-[500] text-gray-900">{t("contact.writeToUs")}</h3>
                 </div>
                 <p className="text-[14px] text-gray-600 mb-[15px]">{t("contact.fillForm")}</p>
                 <p className="text-[14px] text-gray-600 mb-[10px]">{t("contact.email")}: customer@exclusive.com</p>
                 <p className="text-[14px] text-gray-600">{t("contact.email")}: support@exclusive.com</p>
              </div>

            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-[40px]">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px] mb-[20px]">
                  <div>
                    <Input 
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact.name")} 
                      className={`bg-[#F5F5F5] border-none h-[50px] rounded-xl ${errors.name ? 'ring-2 ring-red-500' : ''}`} 
                    />
                  </div>
                  <div>
                    <Input 
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.email")} 
                      className={`bg-[#F5F5F5] border-none h-[50px] rounded-xl ${errors.email ? 'ring-2 ring-red-500' : ''}`} 
                    />
                  </div>
                  <div>
                    <Input 
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("contact.phonePlaceholder")} 
                      className={`bg-[#F5F5F5] border-none h-[50px] rounded-xl ${errors.phone ? 'ring-2 ring-red-500' : ''}`} 
                    />
                  </div>
                </div>

                <div className="mb-[20px]">
                  <textarea 
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.message")} 
                    rows={8} 
                    className={`w-full bg-[#F5F5F5] border-none rounded-xl p-4 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 resize-none ${errors.message ? 'ring-2 ring-red-500' : ''}`} 
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-[#DB4444] hover:bg-red-600 border-none h-[56px] px-[48px] rounded-xl text-[16px] font-[500]"
                  >
                    {t("contact.sendMessage")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
