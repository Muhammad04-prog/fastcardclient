// Separate billing form fields data from checkout.tsx to keep it lean
export type FormKey = "firstName" | "lastName" | "address" | "apartment" | "city" | "phoneNumber" | "email"

export const BILLING_FIELDS: {
  id: string
  name: FormKey
  type: string
  labelKey: string
  fallback: string
}[] = [
  { id: "checkout-firstname",  name: "firstName",   type: "text",  labelKey: "checkout.firstName",   fallback: "First name" },
  { id: "checkout-lastname",   name: "lastName",    type: "text",  labelKey: "checkout.lastName",    fallback: "Last name" },
  { id: "checkout-address",    name: "address",     type: "text",  labelKey: "checkout.address",     fallback: "Street address" },
  { id: "checkout-apartment",  name: "apartment",   type: "text",  labelKey: "checkout.apartment",   fallback: "Apartment, floor, etc. (optional)" },
  { id: "checkout-city",       name: "city",        type: "text",  labelKey: "checkout.city",        fallback: "Town/City" },
  { id: "checkout-phone",      name: "phoneNumber", type: "text",  labelKey: "checkout.phone",       fallback: "Phone number" },
  { id: "checkout-email",      name: "email",       type: "email", labelKey: "checkout.email",       fallback: "Email address" },
]
