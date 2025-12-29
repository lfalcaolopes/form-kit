# DefaultForm Component - Complete Documentation

## Table of Contents

1. [Overview](#overview)
2. [Basic Usage](#basic-usage)
3. [FormSchema Structure](#formschema-structure)
4. [Field Types](#field-types)
5. [Field Configuration Properties](#field-configuration-properties)
6. [Layout Options](#layout-options)
7. [Form-Level Props](#form-level-props)
8. [Data Processing & Validation](#data-processing--validation)
9. [Advanced Features](#advanced-features)
10. [Real-World Examples](#real-world-examples)
11. [Helper Functions](#helper-functions)

---

## Overview

`DefaultForm` is a powerful, dynamic form component built on top of `react-hook-form` that automatically generates form fields based on a schema definition. It handles validation, data transformation, layout, permissions, and much more.

### Key Features

- **Schema-driven**: Define your form structure with a simple schema object
- **Type-safe**: Built-in field type validation and transformation
- **Flexible layouts**: Row-based, column-based, or free-form layouts
- **Conditional rendering**: Show/hide fields based on form values
- **Permission-aware**: Built-in permission handling
- **Rich field types**: 20+ field types including custom components
- **Auto-validation**: Automatic validation based on schema and rules
- **Data transformation**: Pre-submit and post-submit data transformation
- **Nested objects**: Support for nested object structures

---

## Basic Usage

```javascript
import { DefaultForm } from './components/units/DefaultForm';
import { FieldTypes } from './api/enums/FieldTypes';

const formSchema = {
  name: {
    type: String,
    form: {
      label: 'Name',
      placeholder: 'Enter your name',
      rules: {
        required: 'Name is required',
      },
    },
  },
  email: {
    type: String,
    form: {
      label: 'Email',
      type: FieldTypes.TEXT,
      placeholder: 'Enter your email',
    },
  },
};

function MyForm() {
  const handleSubmit = async (data) => {
    console.log('Form data:', data);
  };

  return (
    <DefaultForm
      formSchema={formSchema}
      onSubmit={handleSubmit}
      title="User Form"
      submitButtonLabel="Save"
    />
  );
}
```

---

## FormSchema Structure

The `formSchema` is an object where each key represents a field name, and the value is a field definition.

### Field Definition Structure

```javascript
{
  fieldName: {
    type: Type,              // String, Number, Boolean, Array, Object, Date
    optional: Boolean,       // If true, field is not required (default: false)
    defaultValue: Any,       // Default value for the field
    form: {                  // Form-specific configuration
      // ... form configuration options (see below)
    },
    schema: Object,          // For nested objects (type: Object)
  }
}
```

### Example with All Properties

```javascript
{
  username: {
    type: String,
    optional: false,
    defaultValue: '',
    form: {
      label: 'Username',
      placeholder: 'Enter username',
      type: FieldTypes.TEXT,
      helpText: 'Choose a unique username',
      rules: {
        required: 'Username is required',
        minLength: {
          value: 3,
          message: 'Minimum 3 characters',
        },
      },
      row: 1,
      readOnly: false,
      disabled: false,
    },
  },
}
```

---

## Field Types

The component supports multiple field types through the `FieldTypes` enum:

### Text-Based Types

```javascript
FieldTypes.TEXT                     // Standard text input
FieldTypes.SECRET_TEXT              // Password/secret input (hidden)
FieldTypes.TEXTAREA                 // Multi-line text area
FieldTypes.RICH_TEXT               // Rich text editor (WYSIWYG)
```

### Number & Date Types

```javascript
FieldTypes.NUMBER                   // Number input
FieldTypes.DATE                     // Date picker
FieldTypes.TIME                     // Time picker
FieldTypes.DATE_TIME               // Date & time picker
```

### Selection Types

```javascript
FieldTypes.SELECT_ENUM_ONE_OPTION               // Single select dropdown
FieldTypes.SELECT_ENUM_MULTIPLE_OPTION          // Multi-select dropdown
FieldTypes.SEARCH_SELECT_ENUM_MULTIPLE_OPTION   // Searchable multi-select
FieldTypes.RADIO_ENUM_ONE_OPTION                // Radio buttons
FieldTypes.CHECKBOX_ENUM_MULTIPLE_OPTION        // Multiple checkboxes
```

### Boolean Types

```javascript
FieldTypes.CHECKBOX                 // Single checkbox
FieldTypes.SWITCH                   // Toggle switch
```

### Special Types

```javascript
FieldTypes.COLOR                    // Color picker
FieldTypes.FILE                     // File upload
FieldTypes.SELECT_FROM_DATA_METHOD  // Dynamic select from API method
FieldTypes.CUSTOM                   // Custom component
FieldTypes.OBJECT                   // Nested object structure
```

### Field Type Examples

#### Text Input
```javascript
name: {
  type: String,
  form: {
    label: 'Full Name',
    placeholder: 'John Doe',
  },
}
```

#### Number Input
```javascript
age: {
  type: Number,
  form: {
    type: FieldTypes.NUMBER,
    label: 'Age',
    min: 0,
    max: 120,
  },
}
```

#### Switch (Boolean)
```javascript
isActive: {
  type: Boolean,
  form: {
    type: FieldTypes.SWITCH,
    label: 'Active Status',
    helpText: 'Enable or disable this item',
  },
}
```

#### Select from Enum
```javascript
status: {
  type: String,
  form: {
    type: FieldTypes.SELECT_ENUM_ONE_OPTION,
    label: 'Status',
    options: [
      { name: 'active', label: 'Active' },
      { name: 'inactive', label: 'Inactive' },
      { name: 'pending', label: 'Pending' },
    ],
  },
}
```

#### Multi-Select
```javascript
tags: {
  type: Array,
  form: {
    type: FieldTypes.SELECT_ENUM_MULTIPLE_OPTION,
    label: 'Tags',
    options: [
      { name: 'urgent', label: 'Urgent' },
      { name: 'important', label: 'Important' },
      { name: 'review', label: 'Needs Review' },
    ],
  },
}
```

#### Select from Data Method (Dynamic Options)
```javascript
storeId: {
  type: String,
  form: {
    type: FieldTypes.SELECT_FROM_DATA_METHOD,
    label: 'Store',
    method: 'getStoresByCompanyId',
    getDataMethodArgs: ({ values }) => ({
      arg: { companyId: values.companyId },
    }),
    formatter: (stores) => stores.map(store => ({
      name: store._id,
      label: `${store.name} (${store.externalId})`,
    })),
  },
}
```

#### Nested Object
```javascript
address: {
  type: Object,
  form: {
    label: 'Address',
    schema: {
      street: {
        type: String,
        form: { label: 'Street' },
      },
      city: {
        type: String,
        form: { label: 'City' },
      },
      zipCode: {
        type: String,
        form: { label: 'ZIP Code' },
      },
    },
  },
}
```

#### Custom Component
```javascript
customField: {
  type: String,
  form: {
    type: FieldTypes.CUSTOM,
    label: 'Custom Field',
    component: MyCustomComponent,
    componentProps: {
      customProp: 'value',
    },
  },
}
```

---

## Field Configuration Properties

Each field's `form` object can contain the following properties:

### Display Properties

| Property | Type | Description |
|----------|------|-------------|
| `label` | String | Field label displayed above input |
| `formLabel` | String | Alternative label specifically for forms |
| `placeholder` | String | Placeholder text for the input |
| `helpText` | String/Component | Helper text below the field |
| `icon` | FontAwesome Icon | Icon to display with the field |

### Validation Properties

| Property | Type | Description |
|----------|------|-------------|
| `required` | Boolean | Mark field as required |
| `getIsRequired` | Function | Dynamic required based on form values |
| `rules` | Object | React Hook Form validation rules |

#### Validation Rules Examples

```javascript
rules: {
  required: 'This field is required',
  minLength: {
    value: 3,
    message: 'Minimum 3 characters',
  },
  maxLength: {
    value: 50,
    message: 'Maximum 50 characters',
  },
  pattern: {
    value: /^[A-Za-z]+$/,
    message: 'Only letters allowed',
  },
  validate: (value, { values }) => {
    if (values.someField && !value) {
      return 'This field is required when someField is set';
    }
    return true;
  },
}
```

### State Properties

| Property | Type | Description |
|----------|------|-------------|
| `disabled` | Boolean | Disable the field |
| `readOnly` | Boolean | Make field read-only |
| `getIsDisabled` | Function | Dynamic disabled state |
| `hidden` | Boolean | Hide the field completely |

### Conditional Rendering

```javascript
shouldHide: ({ values, methods }) => {
  return !values.someOtherField;
}
```

### Layout Properties

| Property | Type | Description |
|----------|------|-------------|
| `row` | Number | Row number for row-based layout |
| `column` | Number | Column number for column-based layout |

### Option Properties (for select/radio/checkbox types)

| Property | Type | Description |
|----------|------|-------------|
| `options` | Array | Static options list |
| `getOptions` | Function | Dynamic options based on form values |
| `enum` | Object | Enum object for options |

#### Options Array Format

```javascript
options: [
  {
    name: 'value1',           // The value stored in form
    label: 'Display Label',   // The label shown to user
    formLabel: 'Form Label',  // Alternative label for forms
    value: 'customValue',     // Optional custom value
    readOnly: false,          // Make option read-only
    group: 'Group Name',      // Group options together
  },
]
```

#### Dynamic Options

```javascript
getOptions: ({ values, methods }) => {
  if (values.category === 'electronics') {
    return [
      { name: 'phone', label: 'Phone' },
      { name: 'laptop', label: 'Laptop' },
    ];
  }
  return [
    { name: 'book', label: 'Book' },
    { name: 'magazine', label: 'Magazine' },
  ];
}
```

### Section Headers

| Property | Type | Description |
|----------|------|-------------|
| `titleBefore` | String | Section title before field |
| `titleBeforeClassName` | String | CSS class for title |
| `descriptionBefore` | String | Description before field |

### Custom Components

| Property | Type | Description |
|----------|------|-------------|
| `component` | Component | Custom React component |
| `componentProps` | Object | Props to pass to component |
| `componentBefore` | Component | Component to render before field |
| `componentAfter` | Component | Component to render after field |

### Field-Specific Properties

#### For Text Inputs
```javascript
mask: String,              // Input mask (e.g., phone numbers)
replacement: Object,       // Character replacement rules
buildMask: Function,       // Function to build mask dynamically
```

#### For Number Inputs
```javascript
min: Number,               // Minimum value
max: Number,               // Maximum value
step: Number,              // Step increment
```

#### For File Inputs
```javascript
accept: String,            // Accepted file types
multiple: Boolean,         // Allow multiple files
maxSize: Number,           // Max file size in bytes
```

#### For Select from Data Method
```javascript
method: String,                        // Meteor method name
dataMethodArgs: Object,                // Static method arguments
getDataMethodArgs: Function,           // Dynamic method arguments
formatter: Function,                   // Format API response to options
```

### Miscellaneous

| Property | Type | Description |
|----------|------|-------------|
| `defaultValue` | Any | Default value (overrides schema level) |
| `after` | String/Component | Content after the input |
| `getAfter` | Function | Dynamic after content |
| `allowCustomOptions` | Boolean | Allow custom values in arrays |

---

## Layout Options

DefaultForm supports three layout strategies:

### 1. Free-Form Layout (Default)

Fields are rendered in the order they appear in the schema, one per line.

```javascript
const formSchema = {
  field1: { /* config */ },
  field2: { /* config */ },
  field3: { /* config */ },
};
```

### 2. Row-Based Layout

Group fields horizontally by row number. Fields with the same `row` value appear side-by-side.

```javascript
const formSchema = {
  firstName: {
    type: String,
    form: {
      label: 'First Name',
      row: 1,
    },
  },
  lastName: {
    type: String,
    form: {
      label: 'Last Name',
      row: 1,
    },
  },
  email: {
    type: String,
    form: {
      label: 'Email',
      row: 2,
    },
  },
};
```

**Important**: When using `row`, ALL visible fields must have a `row` property.

### 3. Column-Based Layout

Group fields vertically by column number. Fields with the same `column` value appear in the same column.

```javascript
const formSchema = {
  field1: {
    type: String,
    form: {
      label: 'Field 1',
      column: 0,
    },
  },
  field2: {
    type: String,
    form: {
      label: 'Field 2',
      column: 0,
    },
  },
  field3: {
    type: String,
    form: {
      label: 'Field 3',
      column: 1,
    },
  },
};
```

**Important**: When using `column`, ALL visible fields must have a `column` property.

**You cannot mix row and column layouts** - choose one strategy per form.

---

## Form-Level Props

The `DefaultForm` component accepts these props:

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `formSchema` | Object | The form schema definition |

### Submission Props

| Prop | Type | Description |
|------|------|-------------|
| `methodName` | String | Meteor method to call on submit |
| `onSubmit` | Function | Custom submit handler |
| `onBeforeSave` | Function | Called before submission (can cancel) |
| `onAfterSave` | Function | Called after successful submission |
| `transformBeforeFormSubmit` | Function | Transform data before submission |

**Note**: You cannot use both `methodName` and `onSubmit` together.

#### Submission Handler Examples

```javascript
// Using Meteor method
<DefaultForm
  formSchema={formSchema}
  methodName="users.update"
/>

// Using custom onSubmit
<DefaultForm
  formSchema={formSchema}
  onSubmit={async (data) => {
    await api.saveUser(data);
  }}
/>

// Using onBeforeSave to validate or cancel
<DefaultForm
  formSchema={formSchema}
  onSubmit={handleSubmit}
  onBeforeSave={async ({ values, methods }) => {
    const confirmed = await confirm('Save changes?');
    return confirmed; // Return false to cancel submission
  }}
/>

// Transform data before submit
<DefaultForm
  formSchema={formSchema}
  onSubmit={handleSubmit}
  transformBeforeFormSubmit={(data) => ({
    ...data,
    timestamp: new Date(),
  })}
/>
```

### Display Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | String | - | Form title |
| `formInfo` | String | - | Info message displayed in form |
| `className` | String | `'flex h-full flex-col gap-5'` | Form container class |
| `boxClassName` | String | - | Form box wrapper class |
| `useFormBox` | Boolean | `true` | Wrap fields in FormBox component |
| `columnsBoxClassName` | String | - | CSS class for columns container |

### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `submitButtonLabel` | String | `'Salvar'` | Submit button text |
| `submitButtonIcon` | Icon | - | Submit button icon |
| `submitButtonClassName` | String | - | Submit button CSS class |
| `submitButtonSize` | String | - | Submit button size |
| `submitButtonLoading` | Boolean | `false` | Show loading state |
| `hideSubmitButton` | Boolean | `false` | Hide submit button |
| `cancelButtonLabel` | String | `'Cancelar'` | Cancel button text |
| `cancelButtonType` | String | `'tertiary'` | Cancel button type |
| `cancelButtonSize` | String | - | Cancel button size |
| `hideCancelButton` | Boolean | `true` | Hide cancel button |
| `hideCancelButtonIcon` | Boolean | `false` | Hide cancel button icon |
| `onCancel` | Function | `() => {}` | Cancel button handler |
| `clearButtonLabel` | String | `'Redefinir filtros'` | Clear button text |
| `hideClearButton` | Boolean | `true` | Hide clear button |
| `onClear` | Function | - | Clear button handler |
| `extraButton` | Component | - | Additional custom button |
| `extraButtons` | Component | - | Multiple custom buttons |
| `onExtraButtonAction` | Function | - | Extra button handler |
| `buttonWrapperClassName` | String | `'flex justify-end gap-3'` | Buttons container class |
| `iconAfterText` | Boolean | `false` | Position icon after text |

### Save Bar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showSaveBar` | Boolean | `false` | Use SaveBar instead of buttons |
| `showDiscardButton` | Boolean | - | Show discard button in SaveBar |
| `showMessage` | Boolean | - | Show messages in SaveBar |

### Form State Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValues` | Object | `{}` | Initial form values |
| `setFormRef` | Function | - | Get form methods reference |
| `shouldVerifyFormDirtyToUpdateFormRef` | Boolean | `false` | Update ref on dirty change |
| `shouldVerifyFormErrorsToUpdateFormRef` | Boolean | `false` | Update ref on error change |
| `formStateFieldsToWatch` | Array | `[]` | Form state fields to watch |
| `shouldSkipReset` | Boolean | `false` | Skip form reset after submit |
| `depsToResetForm` | Array | `null` | Dependencies to trigger reset |

### Permission Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `permission` | String | - | Permission name to check |
| `hasPermission` | Boolean | `true` | User has permission |

### Watch Props

| Prop | Type | Description |
|------|------|-------------|
| `fieldsToWatchDeps` | Array | Field names to watch |
| `watchHandler` | Function | Handler called when watched fields change |

```javascript
<DefaultForm
  formSchema={formSchema}
  fieldsToWatchDeps={['category', 'subcategory']}
  watchHandler={({ category, subcategory }) => {
    console.log('Fields changed:', category, subcategory);
  }}
/>
```

### Form Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ignoreFormDirtyCheck` | Boolean | `false` | Ignore dirty check for save button |

---

## Data Processing & Validation

### Data Flow

1. **Initial Values** → Form displays with `defaultValues`
2. **User Input** → Form state updates in react-hook-form
3. **Validation** → Field-level validation on change/blur
4. **Submit** → Multiple transformation steps
5. **Save** → Data sent to method or onSubmit handler
6. **Reset** → Form resets with submitted values

### Transformation Pipeline

When the form is submitted, data goes through this pipeline:

```
User Data
  ↓
transformBooleanFieldsBeforeSubmit() - Converts boolean fields
  ↓
transformBeforeFormSubmit() - Your custom transformation
  ↓
validateDataBasedOnSchema() - Validates and filters based on schema
  ↓
onBeforeSave() - Final validation/cancellation check
  ↓
onSubmit() or methodName - Actual submission
  ↓
onAfterSave() - Post-submission actions
  ↓
resetForm() - Reset form to submitted state (unless shouldSkipReset)
```

### Boolean Field Transformation

The form automatically converts boolean-ish values to true booleans:

```javascript
// Input
{ isActive: 'true', isEnabled: '', isVisible: true }

// After transformBooleanFieldsBeforeSubmit
{ isActive: true, isEnabled: false, isVisible: true }
```

### Schema-Based Validation

The `validateDataBasedOnSchema` function:

1. Removes fields with `shouldHide: true`
2. Validates array fields against allowed options
3. Handles conditional required fields (`getIsRequired`)
4. Processes nested objects recursively

```javascript
// Example with conditional required
{
  enableNotifications: {
    type: Boolean,
    form: {
      type: FieldTypes.SWITCH,
      label: 'Enable Notifications',
    },
  },
  notificationEmail: {
    type: String,
    form: {
      label: 'Email',
      getIsRequired: ({ values }) => values.enableNotifications,
      shouldHide: ({ values }) => !values.enableNotifications,
    },
  },
}
```

### Array Validation

Arrays are validated against their options (if provided):

```javascript
{
  permissions: {
    type: Array,
    form: {
      type: FieldTypes.SELECT_ENUM_MULTIPLE_OPTION,
      options: [
        { name: 'read', label: 'Read' },
        { name: 'write', label: 'Write' },
      ],
      allowCustomOptions: false, // Filters out unknown values
    },
  },
}

// Input: ['read', 'write', 'delete']
// Output: ['read', 'write'] - 'delete' filtered out
```

---

## Advanced Features

### 1. Conditional Fields

Show/hide fields based on other field values:

```javascript
{
  hasAddress: {
    type: Boolean,
    form: {
      type: FieldTypes.SWITCH,
      label: 'Has Address',
    },
  },
  street: {
    type: String,
    form: {
      label: 'Street',
      shouldHide: ({ values }) => !values.hasAddress,
      getIsRequired: ({ values }) => values.hasAddress,
    },
  },
}
```

### 2. Dynamic Options

Change options based on other fields:

```javascript
{
  country: {
    type: String,
    form: {
      type: FieldTypes.SELECT_ENUM_ONE_OPTION,
      label: 'Country',
      options: [
        { name: 'us', label: 'United States' },
        { name: 'br', label: 'Brazil' },
      ],
    },
  },
  state: {
    type: String,
    form: {
      type: FieldTypes.SELECT_ENUM_ONE_OPTION,
      label: 'State',
      getOptions: ({ values }) => {
        if (values.country === 'us') {
          return [
            { name: 'ny', label: 'New York' },
            { name: 'ca', label: 'California' },
          ];
        }
        if (values.country === 'br') {
          return [
            { name: 'sp', label: 'São Paulo' },
            { name: 'rj', label: 'Rio de Janeiro' },
          ];
        }
        return [];
      },
    },
  },
}
```

### 3. Permission-Based Fields

Control field access based on permissions:

```javascript
import { getDefaultFormPropsForEditPermission } from './DefaultForm';

const hasEditPermission = checkPermission('users.edit');

<DefaultForm
  formSchema={formSchema}
  {...getDefaultFormPropsForEditPermission({ 
    hasPermission: hasEditPermission 
  })}
/>

// This sets:
// - hasPermission: hasEditPermission
// - showSaveBar: hasEditPermission
// - hideSubmitButton: !hasEditPermission
```

### 4. Form Methods Access

Get access to react-hook-form methods:

```javascript
function MyComponent() {
  const [formRef, setFormRef] = useState(null);

  useEffect(() => {
    if (formRef) {
      // Access form methods
      const values = formRef.getValues();
      formRef.setValue('fieldName', 'newValue');
      formRef.reset();
      // ... all react-hook-form methods available
    }
  }, [formRef]);

  return (
    <DefaultForm
      formSchema={formSchema}
      setFormRef={setFormRef}
    />
  );
}
```

### 5. Watching Form Changes

React to specific field changes:

```javascript
<DefaultForm
  formSchema={formSchema}
  fieldsToWatchDeps={['productType', 'quantity']}
  watchHandler={({ productType, quantity }) => {
    // Called whenever productType or quantity changes
    if (productType === 'bulk' && quantity < 10) {
      console.warn('Bulk orders require minimum 10 items');
    }
  }}
/>
```

### 6. Custom Validation

Add complex validation logic:

```javascript
{
  password: {
    type: String,
    form: {
      label: 'Password',
      type: FieldTypes.SECRET_TEXT,
    },
  },
  confirmPassword: {
    type: String,
    form: {
      label: 'Confirm Password',
      type: FieldTypes.SECRET_TEXT,
      rules: {
        validate: (value, { values }) => {
          if (value !== values.password) {
            return 'Passwords must match';
          }
          return true;
        },
      },
    },
  },
}
```

### 7. Grouped Options

Group select options:

```javascript
{
  category: {
    type: String,
    form: {
      type: FieldTypes.SELECT_ENUM_ONE_OPTION,
      label: 'Category',
      options: [
        { name: 'laptop', label: 'Laptop', group: 'Electronics' },
        { name: 'phone', label: 'Phone', group: 'Electronics' },
        { name: 'desk', label: 'Desk', group: 'Furniture' },
        { name: 'chair', label: 'Chair', group: 'Furniture' },
      ],
    },
  },
}
```

### 8. Section Headers

Organize form with section headers:

```javascript
{
  name: {
    type: String,
    form: {
      titleBefore: 'Personal Information',
      descriptionBefore: 'Enter your personal details below',
      label: 'Full Name',
    },
  },
  email: {
    type: String,
    form: {
      label: 'Email',
    },
  },
  company: {
    type: String,
    form: {
      titleBefore: 'Professional Information',
      label: 'Company Name',
    },
  },
}
```

### 9. Custom Components Before/After Fields

```javascript
{
  field1: {
    type: String,
    form: {
      label: 'Field 1',
      componentBefore: <div>This appears before the field</div>,
      componentAfter: <div>This appears after the field</div>,
    },
  },
}
```

### 10. Input Masks

Apply masks to text inputs:

```javascript
{
  phone: {
    type: String,
    form: {
      label: 'Phone',
      mask: '(999) 999-9999',
      replacement: { 9: /\d/ },
    },
  },
}
```

---

## Real-World Examples

### Example 1: User Registration Form

```javascript
import { FieldTypes } from '../api/enums/FieldTypes';

const userRegistrationSchema = {
  // Personal Info Section
  firstName: {
    type: String,
    form: {
      titleBefore: 'Personal Information',
      label: 'First Name',
      placeholder: 'John',
      row: 1,
      rules: {
        required: 'First name is required',
        minLength: {
          value: 2,
          message: 'Minimum 2 characters',
        },
      },
    },
  },
  lastName: {
    type: String,
    form: {
      label: 'Last Name',
      placeholder: 'Doe',
      row: 1,
      rules: {
        required: 'Last name is required',
      },
    },
  },
  email: {
    type: String,
    form: {
      label: 'Email',
      placeholder: 'john.doe@example.com',
      row: 2,
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address',
        },
      },
    },
  },
  phone: {
    type: String,
    optional: true,
    form: {
      label: 'Phone',
      placeholder: '(555) 123-4567',
      row: 2,
      mask: '(999) 999-9999',
      replacement: { 9: /\d/ },
    },
  },

  // Account Section
  username: {
    type: String,
    form: {
      titleBefore: 'Account Details',
      label: 'Username',
      placeholder: 'johndoe',
      row: 3,
      rules: {
        required: 'Username is required',
        minLength: {
          value: 3,
          message: 'Minimum 3 characters',
        },
        pattern: {
          value: /^[a-zA-Z0-9_]+$/,
          message: 'Only letters, numbers and underscores',
        },
      },
    },
  },
  password: {
    type: String,
    form: {
      type: FieldTypes.SECRET_TEXT,
      label: 'Password',
      row: 4,
      rules: {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Minimum 8 characters',
        },
      },
    },
  },
  confirmPassword: {
    type: String,
    form: {
      type: FieldTypes.SECRET_TEXT,
      label: 'Confirm Password',
      row: 4,
      rules: {
        required: 'Please confirm password',
        validate: (value, { values }) =>
          value === values.password || 'Passwords must match',
      },
    },
  },

  // Preferences
  receiveNewsletter: {
    type: Boolean,
    defaultValue: false,
    form: {
      titleBefore: 'Preferences',
      type: FieldTypes.SWITCH,
      label: 'Receive Newsletter',
      helpText: 'Get weekly updates about new features',
      row: 5,
    },
  },
  interests: {
    type: Array,
    defaultValue: [],
    form: {
      type: FieldTypes.SELECT_ENUM_MULTIPLE_OPTION,
      label: 'Interests',
      row: 6,
      options: [
        { name: 'technology', label: 'Technology' },
        { name: 'sports', label: 'Sports' },
        { name: 'music', label: 'Music' },
        { name: 'travel', label: 'Travel' },
      ],
    },
  },
};

function UserRegistrationForm() {
  const handleSubmit = async (data) => {
    // Remove confirmPassword before sending
    const { confirmPassword, ...userData } = data;
    await api.registerUser(userData);
  };

  return (
    <DefaultForm
      formSchema={userRegistrationSchema}
      title="Create Account"
      onSubmit={handleSubmit}
      submitButtonLabel="Register"
      transformBeforeFormSubmit={(data) => {
        const { confirmPassword, ...rest } = data;
        return rest;
      }}
    />
  );
}
```

### Example 2: Store Configuration Form

```javascript
const storeConfigSchema = {
  // Basic Info
  name: {
    type: String,
    form: {
      titleBefore: 'Store Information',
      label: 'Store Name',
      placeholder: 'Downtown Store',
      column: 0,
      rules: {
        required: 'Store name is required',
      },
    },
  },
  externalId: {
    type: String,
    optional: true,
    form: {
      label: 'External ID',
      placeholder: 'STORE-001',
      column: 0,
    },
  },

  // Address
  zipCode: {
    type: String,
    form: {
      titleBefore: 'Address',
      label: 'ZIP Code',
      placeholder: '12345',
      column: 0,
      type: FieldTypes.CUSTOM,
      component: CEPInput, // Custom component that fetches address
    },
  },
  street: {
    type: String,
    form: {
      label: 'Street',
      column: 0,
    },
  },
  city: {
    type: String,
    form: {
      label: 'City',
      column: 0,
    },
  },

  // Configuration
  enableReturns: {
    type: Boolean,
    form: {
      titleBefore: 'Configuration',
      type: FieldTypes.SWITCH,
      label: 'Enable Returns',
      helpText: 'Allow customers to return products to this store',
      column: 1,
    },
  },
  returnDestinationId: {
    type: String,
    optional: true,
    form: {
      type: FieldTypes.SELECT_FROM_DATA_METHOD,
      label: 'Return Destination Store',
      method: 'getStoresByCompanyId',
      getDataMethodArgs: ({ values }) => ({
        arg: { companyId: values.companyId },
      }),
      formatter: (stores) =>
        stores.map((s) => ({
          name: s._id,
          label: `${s.name} (${s.externalId})`,
        })),
      shouldHide: ({ values }) => !values.enableReturns,
      getIsRequired: ({ values }) => values.enableReturns,
      column: 1,
    },
  },
  notifyOnReturn: {
    type: Boolean,
    form: {
      type: FieldTypes.CHECKBOX,
      label: 'Send email notification on returns',
      shouldHide: ({ values }) => !values.enableReturns,
      column: 1,
    },
  },
  notificationEmail: {
    type: String,
    optional: true,
    form: {
      label: 'Notification Email',
      placeholder: 'returns@store.com',
      shouldHide: ({ values }) =>
        !values.enableReturns || !values.notifyOnReturn,
      getIsRequired: ({ values }) =>
        values.enableReturns && values.notifyOnReturn,
      column: 1,
      rules: {
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email',
        },
      },
    },
  },
};

function StoreConfigForm({ storeId, companyId }) {
  const { data: store, loading } = useDataMethod({
    methodName: 'getStoreById',
    arg: { storeId },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <DefaultForm
      formSchema={storeConfigSchema}
      methodName="stores.update"
      defaultValues={{
        ...store,
        companyId,
      }}
      title="Store Configuration"
      submitButtonLabel="Save Changes"
      showSaveBar={true}
      columnsBoxClassName="lg:flex-row flex-col"
      onAfterSave={() => {
        console.log('Store updated successfully');
      }}
    />
  );
}
```

### Example 3: Filter Form

```javascript
const filterSchema = {
  searchTerm: {
    type: String,
    optional: true,
    form: {
      label: 'Search',
      placeholder: 'Search by name, email...',
      row: 1,
    },
  },
  status: {
    type: Array,
    defaultValue: [],
    form: {
      type: FieldTypes.SELECT_ENUM_MULTIPLE_OPTION,
      label: 'Status',
      row: 1,
      options: [
        { name: 'active', label: 'Active' },
        { name: 'inactive', label: 'Inactive' },
        { name: 'pending', label: 'Pending' },
      ],
    },
  },
  dateFrom: {
    type: String,
    optional: true,
    form: {
      type: FieldTypes.DATE,
      label: 'From Date',
      row: 2,
    },
  },
  dateTo: {
    type: String,
    optional: true,
    form: {
      type: FieldTypes.DATE,
      label: 'To Date',
      row: 2,
    },
  },
};

function FilterForm({ onFilterChange }) {
  return (
    <DefaultForm
      formSchema={filterSchema}
      onSubmit={onFilterChange}
      submitButtonLabel="Apply Filters"
      hideClearButton={false}
      clearButtonLabel="Clear Filters"
      hideCancelButton={true}
      useFormBox={false}
      ignoreFormDirtyCheck={true} // Allow submit even without changes
    />
  );
}
```

---

## Helper Functions

### `getFormSchemaDefaultValues(schema)`

Extracts default values from a form schema.

```javascript
import { getFormSchemaDefaultValues } from './DefaultForm';

const schema = {
  name: { type: String, defaultValue: '' },
  age: { type: Number, form: { defaultValue: 18 } },
  active: { type: Boolean, defaultValue: true },
};

const defaults = getFormSchemaDefaultValues(schema);
// { name: '', age: 18, active: true }
```

### `getDefaultFormPropsForEditPermission({ hasPermission })`

Returns props configuration based on edit permission.

```javascript
import { getDefaultFormPropsForEditPermission } from './DefaultForm';

const hasEditPermission = checkPermission('users.edit');

<DefaultForm
  formSchema={formSchema}
  {...getDefaultFormPropsForEditPermission({ 
    hasPermission: hasEditPermission 
  })}
/>

// Equivalent to:
<DefaultForm
  formSchema={formSchema}
  hasPermission={hasEditPermission}
  showSaveBar={hasEditPermission}
  hideSubmitButton={!hasEditPermission}
/>
```

### `validateDataBasedOnSchema({ data, formSchema })`

Validates and filters data based on schema rules.

```javascript
import { validateDataBasedOnSchema } from './DefaultForm';

const data = {
  field1: 'value1',
  field2: 'value2', // This field has shouldHide: true
  field3: ['option1', 'option2', 'invalid'], // Will be filtered
};

const validated = validateDataBasedOnSchema({ data, formSchema });
// Returns only valid fields and options
```

---

## Best Practices

### 1. Schema Organization

Create reusable schema functions:

```javascript
// schemas/userSchemas.js
export function getUserBasicInfoSchema() {
  return {
    firstName: {
      type: String,
      form: { label: 'First Name', row: 1 },
    },
    lastName: {
      type: String,
      form: { label: 'Last Name', row: 1 },
    },
    email: {
      type: String,
      form: { label: 'Email', row: 2 },
    },
  };
}

// Usage
import { getUserBasicInfoSchema } from './schemas/userSchemas';

const formSchema = {
  ...getUserBasicInfoSchema(),
  // Add more fields
};
```

### 2. Validation

Keep validation in the schema:

```javascript
// Good
{
  email: {
    type: String,
    form: {
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email',
        },
      },
    },
  },
}

// Avoid - don't validate in onBeforeSave unless necessary
```

### 3. Conditional Logic

Use `shouldHide` and `getIsRequired` for dynamic behavior:

```javascript
// Good
{
  enableFeature: {
    type: Boolean,
    form: {
      type: FieldTypes.SWITCH,
      label: 'Enable Feature',
    },
  },
  featureConfig: {
    type: String,
    form: {
      label: 'Configuration',
      shouldHide: ({ values }) => !values.enableFeature,
      getIsRequired: ({ values }) => values.enableFeature,
    },
  },
}
```

### 4. Layout Strategy

Choose one layout strategy and stick to it:

```javascript
// Good - consistent row layout
const schema = {
  field1: { form: { row: 1 } },
  field2: { form: { row: 1 } },
  field3: { form: { row: 2 } },
};

// Bad - mixing strategies
const schema = {
  field1: { form: { row: 1 } },
  field2: { form: { column: 0 } }, // Don't mix!
};
```

### 5. Performance

Use `fieldsToWatchDeps` sparingly:

```javascript
// Only watch what you need
<DefaultForm
  fieldsToWatchDeps={['category']} // Not all fields
  watchHandler={({ category }) => {
    // Handle category change
  }}
/>
```

---

## Common Patterns

### Pattern 1: Master-Detail Form

```javascript
const schema = {
  type: {
    type: String,
    form: {
      type: FieldTypes.SELECT_ENUM_ONE_OPTION,
      label: 'Type',
      options: [
        { name: 'individual', label: 'Individual' },
        { name: 'company', label: 'Company' },
      ],
    },
  },
  // Individual fields
  firstName: {
    type: String,
    form: {
      label: 'First Name',
      shouldHide: ({ values }) => values.type !== 'individual',
      getIsRequired: ({ values }) => values.type === 'individual',
    },
  },
  // Company fields
  companyName: {
    type: String,
    form: {
      label: 'Company Name',
      shouldHide: ({ values }) => values.type !== 'company',
      getIsRequired: ({ values }) => values.type === 'company',
    },
  },
};
```

### Pattern 2: Multi-Step Form State

```javascript
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const step1Schema = { /* ... */ };
  const step2Schema = { /* ... */ };

  const currentSchema = step === 1 ? step1Schema : step2Schema;

  return (
    <DefaultForm
      formSchema={currentSchema}
      defaultValues={formData}
      onSubmit={(data) => {
        if (step === 1) {
          setFormData({ ...formData, ...data });
          setStep(2);
        } else {
          // Final submission
          submitAllData({ ...formData, ...data });
        }
      }}
      submitButtonLabel={step === 1 ? 'Next' : 'Submit'}
    />
  );
}
```

### Pattern 3: Read-Only View with Edit Mode

```javascript
function EntityView({ entityId }) {
  const [editMode, setEditMode] = useState(false);
  const { data: entity } = useDataMethod({
    methodName: 'getEntity',
    arg: { entityId },
  });

  return (
    <DefaultForm
      formSchema={formSchema}
      defaultValues={entity}
      hasPermission={editMode}
      showSaveBar={editMode}
      hideSubmitButton={!editMode}
      extraButtons={() => (
        <Button
          onClick={() => setEditMode(!editMode)}
          text={editMode ? 'Cancel' : 'Edit'}
        />
      )}
    />
  );
}
```

---

## Troubleshooting

### Issue: Save button is disabled

**Causes:**
1. Form has validation errors
2. Form is not dirty (no changes made)
3. `ignoreFormDirtyCheck` is false

**Solutions:**
```javascript
// Allow save without changes
<DefaultForm ignoreFormDirtyCheck={true} />

// Check for validation errors in console
// Errors appear automatically in the UI
```

### Issue: Field not showing

**Causes:**
1. `shouldHide` returns true
2. Field has `hidden: true`
3. Layout prop missing (when using row/column)

**Solutions:**
```javascript
// Check shouldHide logic
shouldHide: ({ values }) => {
  console.log('Checking hide for:', values);
  return !values.someField;
}

// Ensure all fields have layout prop when using rows
form: {
  row: 1, // Add this if other fields have it
}
```

### Issue: Form not resetting after submit

**Causes:**
1. `shouldSkipReset` is true
2. Error in submission handler

**Solutions:**
```javascript
// Ensure shouldSkipReset is false (default)
<DefaultForm shouldSkipReset={false} />

// Check onSubmit doesn't throw errors
onSubmit={async (data) => {
  try {
    await saveData(data);
  } catch (error) {
    console.error(error);
    // Form won't reset if error occurs
  }
}}
```

### Issue: Options not updating

**Causes:**
1. Using `options` instead of `getOptions`
2. Not watching dependent field

**Solutions:**
```javascript
// Use getOptions for dynamic options
form: {
  getOptions: ({ values }) => {
    return getOptionsBasedOn(values.otherField);
  },
}
```

---

## Migration Guide

### From Manual Forms to DefaultForm

**Before:**
```javascript
function MyForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Required';
    if (!email) newErrors.email = 'Required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    saveData({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <span>{errors.name}</span>}
      
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <span>{errors.email}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

**After:**
```javascript
function MyForm() {
  const formSchema = {
    name: {
      type: String,
      form: {
        label: 'Name',
        rules: {
          required: 'Required',
        },
      },
    },
    email: {
      type: String,
      form: {
        label: 'Email',
        rules: {
          required: 'Required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email',
          },
        },
      },
    },
  };

  return (
    <DefaultForm
      formSchema={formSchema}
      onSubmit={saveData}
    />
  );
}
```

---

## Performance Considerations

1. **Large Forms**: Break into sections using `titleBefore` or multiple form components
2. **Dynamic Options**: Use `getDataMethodArgs` with proper dependencies
3. **Watch Handlers**: Only watch necessary fields to avoid re-renders
4. **Custom Components**: Memoize expensive custom components

```javascript
// Good - memoized custom component
const CustomField = React.memo(({ value, onChange }) => {
  // Expensive rendering logic
  return <div>...</div>;
});

// Usage
{
  customField: {
    type: String,
    form: {
      type: FieldTypes.CUSTOM,
      component: CustomField,
    },
  },
}
```

---

## Summary

The `DefaultForm` component is a comprehensive solution for building dynamic, validated forms in your application. Key takeaways:

- **Schema-driven**: Define your entire form structure in a declarative way
- **Flexible**: Supports 20+ field types and custom components
- **Powerful**: Built-in validation, conditional rendering, dynamic options
- **Integrated**: Works seamlessly with react-hook-form
- **Maintainable**: Centralized form logic makes updates easy

For questions or issues, refer to the source code at `web/app/components/units/DefaultForm.js`.

