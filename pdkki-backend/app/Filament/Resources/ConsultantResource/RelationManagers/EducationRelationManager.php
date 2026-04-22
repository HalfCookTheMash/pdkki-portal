<?php

namespace App\Filament\Resources\ConsultantResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class EducationRelationManager extends RelationManager
{
    protected static string $relationship = 'education';
    protected static ?string $title = 'Pendidikan';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('degree')
                ->label('Jenjang')
                ->required()
                ->native(false)
                ->selectablePlaceholder(false)
                ->placeholder('Pilih Jenjang')
                ->options([
                    'S1' => 'S1',
                    'S2' => 'S2',
                    'S3' => 'S3',
                ]),
            Forms\Components\TextInput::make('major')
                ->label('Jurusan')
                ->required(),
            Forms\Components\TextInput::make('university')
                ->label('Universitas')
                ->required(),
            Forms\Components\DatePicker::make('graduation_date')
                ->label('Tanggal Ijazah'),
            Forms\Components\FileUpload::make('diploma_file')
                ->label('File Ijazah')
                ->columnSpanFull()
                ->directory('diploma-files'),
        ])->columns(2);
    }

    public function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('degree')->label('Jenjang'),
            Tables\Columns\TextColumn::make('major')->label('Jurusan'),
            Tables\Columns\TextColumn::make('university')->label('Universitas'),
            Tables\Columns\TextColumn::make('graduation_date')
                ->label('Tanggal Ijazah')
                ->date(),
        ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->label('Tambah Pendidikan'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }
}
