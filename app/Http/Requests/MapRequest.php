<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MapRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() : array
    {
        return [
            'width' => ['bail', 'required', 'numeric', 'integer', 'between:100,999'],
            'height' => ['bail', 'required', 'numeric', 'integer', 'between:100,999'],
        ];
    }
}
